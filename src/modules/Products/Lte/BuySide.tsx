"use client";

import WalletIcon from "public/icons/wallet-small.svg";
import ArrowIcon from "public/icons/arrow-small-right.svg";
import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import TextBase from "@/components/Typography/TextBase";
import { useMemo, useState } from "react";
import cn from "@/utils/cn";
import ChevronIcon from "public/icons/chevron-down.svg";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import {
  CreateOrder,
  getLteRegions,
  getLteUsRegions,
  getPriceList,
} from "@/services/customApi";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import BalanceModal from "@/modules/Modals/BalanceModal";
import { useBalance } from "@/hooks/useBalance";
import { getCoupon } from "@/services/api";

const portOptions = [
  { label: "http|https", value: "http|https" },
  { label: "socks5", value: "socks5" },
];

const BuySide = ({
  selectedPlan,
  setSelectedPlan,
}: {
  selectedPlan: any;
  setSelectedPlan: (plan: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [amount, setAmount] = useState<number>(2);
  const [coupon, setCoupon] = useState<string>();
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [couponChecked, setCouponChecked] = useState(false);
  const [discount, setDiscount] = useState<number>(0);

  const { data: countries } = useQuery({
    queryKey: QUERY_KEYS.LTE_REGION,
    queryFn: () => getLteRegions(),
  });

  const { data: usCities } = useQuery({
    queryKey: QUERY_KEYS.LTE_US,
    queryFn: () => getLteUsRegions(),
  });

  const { data: plans } = useQuery({
    queryKey: QUERY_KEYS.PRICING,
    queryFn: () => getPriceList(),
    select: (data) => {
      const products = data?.data?.products || [];

      if (!products) return [];

      const matchingProduct = products.find((product) => product.id === "lte");
      const matchingType = matchingProduct?.types.find(
        (planType) => planType.name === "Rotating"
      ) as { id: number; name: string; plans: any[] } | undefined;
      return (
        matchingType?.plans.map((plan: any) => ({
          ...plan,
          typeId: matchingType.id,
        })) || []
      );
    },
  });

  const { balance } = useBalance();

  const { fetch: couponFetch, loading } = useFetch(getCoupon, false, {
    toastOnError: true,
  });

  let lteOptions = [{ label: "", value: "" }];
  let selectedPlanPrice = selectedPlan?.price ?? 0;

  lteOptions =
    plans?.map((plan: { id: string; name: string }) => ({
      label: plan.name,
      value: plan.id.toString(),
    })) || [];

  const { fetch: createOrderFetch } = useFetch(CreateOrder, false, {
    toastOnError: true,
  });

  const countryOptions = [
    { label: "United States", value: "US" },
    ...(countries?.data
      ? countries.data.map(
          (location: { country_code: number; country: string }) => ({
            label: location.country,
            value: location.country_code.toString(),
          })
        )
      : []),
  ];

  const cityOptions = useMemo(() => {
    if (country === "US") {
      return (
        usCities?.data?.map(
          (region: { region: string; region_code: string }) => ({
            label: region.region,
            value: region.region_code,
          })
        ) || []
      );
    }
    return [];
  }, [country, usCities]);

  const total = selectedPlanPrice * amount;
  const discountedTotal = discount ? total - (discount * total) / 100 : total;

  const onSubmit = async () => {
    if (!selectedPlan) return toast.error("Please select a plan");
    if (balance < discountedTotal) return toast.error("Balance is not enough!");

    try {
      const payload = {
        type: "proxy",
        product: 5,
        plan: selectedPlan.id,
        location: country,
        coupon: coupon,
      };

      await createOrderFetch(payload);
      toast.success("Successfully created!");
    } catch (error) {
      console.log("failed", error);
    }
  };

  const applyCoupon = async () => {
    if (!coupon) return;

    setCouponChecked(false);
    const response = await couponFetch({ coupon_code: coupon });
    setCouponChecked(true);

    const couponData = response?.[0];

    if (!couponData || !couponData.valid) {
      setDiscount(0);
      return;
    }

    if (couponData.discount_type === "percentage") {
      setDiscount(couponData.discount);
      toast.success(`Coupon applied: ${couponData.discount}% off`);
    } else {
      toast.info("Only percentage discounts are supported.");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full gap-6">
      <div className="">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between grow cursor-pointer",
            "pb-6 border-b border-black-border"
          )}
        >
          <p className="text-white font-bold text-xl leading-7.5">Buy Plan</p>
          <ChevronIcon className={cn(isOpen && "rotate-180")} />
        </div>

        {isOpen && (
          <div className="mt-8 flex flex-col gap-6">
            <Autocomplete
              variant="primary"
              options={countryOptions}
              value={country}
              onChange={({ value }) => setCountry(value)}
              label="Country"
              placeholder="Select Country"
            />
            <Autocomplete
              variant="primary"
              options={cityOptions}
              value={city}
              onChange={({ value }) => setCity(value)}
              label="City"
              placeholder="Select City"
            />
            <Autocomplete
              variant="primary"
              options={portOptions}
              value={port}
              onChange={({ value }) => setPort(value)}
              label="Port"
              placeholder="Select Port"
            />
            <Autocomplete
              variant="primary"
              options={lteOptions}
              value={selectedPlan?.id?.toString() ?? ""}
              onChange={({ value }) => {
                const plan = plans?.find((p) => p.id.toString() === value);
                setSelectedPlan(plan || null);
              }}
              label="LTE"
              placeholder="Select Lte"
            />
            <InputText
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setDiscount(0);
                setCouponChecked(false);
              }}
              onBlur={applyCoupon}
              label="Coupon"
              placeholder="Enter Coupon"
              error={!!coupon && couponChecked && discount === 0}
              success={!coupon && couponChecked && discount > 0}
              description={
                loading || !coupon
                  ? ""
                  : discount > 0
                  ? "valid"
                  : couponChecked
                  ? "invalid"
                  : ""
              }
            />
          </div>
        )}

        {isOpen && balance < amount && (
          <div
            className={cn(
              "mt-8 bg-black-2 border-b border-danger py-3 px-4.5",
              "flex items-center justify-between"
            )}
          >
            <div className="flex items-center gap-2">
              <WalletIcon />
              <TextBase className="font-semibold text-white">
                Balance is not enough!
              </TextBase>
            </div>

            <BalanceModal variant="text" />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="bg-black-2 p-4.5 mb-8">
          <p
            className={cn(
              "text-base leading-7 text-grey-100 font-semibold",
              "pb-4.5 border-b border-black-border"
            )}
          >
            Subscription Summary
          </p>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-white text-base leading-6">Price</p>
            <TextBase className="font-semibold text-white">
              $ {total ?? 0}
            </TextBase>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-white text-base leading-6">Number of Proxy</p>
            <TextBase className="font-semibold text-white">
              {amount ?? 0}
            </TextBase>
          </div>

          {discount ? (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-primary-200 text-base leading-6">Discount</p>
              <TextBase className="font-semibold text-primary-200">
                {discount}%
              </TextBase>
            </div>
          ) : null}

          <div className="mt-3 flex items-center justify-between">
            <p className="text-white text-base leading-6">
              Proxy Price per month
            </p>
            <TextBase className="font-semibold text-white">
              ${selectedPlanPrice ?? 0}
            </TextBase>
          </div>

          <div className="bg-black-border h-px w-full my-6"></div>

          <div className="flex items-center justify-between">
            <p className="text-base text-white leading-6">Total Price</p>
            <p className="text-white font-bold text-32 leading-12">
              $ {discountedTotal}
            </p>
          </div>

          <div className="mt-6">
            <Button
              disabled={balance < discountedTotal}
              onClick={onSubmit}
              className="font-semibold w-full py-4"
              RightIcon={ArrowIcon}
            >
              Purchase
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default BuySide;
