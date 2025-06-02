"use client";

import WalletIcon from "public/icons/wallet-small.svg";
import ArrowIcon from "public/icons/arrow-small-right.svg";
import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import TextBase from "@/components/Typography/TextBase";
import { useEffect, useMemo, useState } from "react";
import cn from "@/utils/cn";
import ChevronIcon from "public/icons/chevron-down.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import {
  CreateOrder,
  getLteRegionId,
  getLteRegions,
} from "@/services/customApi";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import BalanceModal from "@/modules/Modals/BalanceModal";
import { useUser } from "@/hooks/useUser";
import { getCoupon, getPriceList } from "@/services/api";
import Loader from "@/components/Loader";

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
  const [amount, setAmount] = useState<number>(1);
  const [coupon, setCoupon] = useState<string>();
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [couponChecked, setCouponChecked] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [regionProxies, setRegionProxies] = useState<any[]>([]);
  const [selectedProxyId, setSelectedProxyId] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: countries } = useQuery({
    queryKey: QUERY_KEYS.LTE_REGION,
    queryFn: () => getLteRegions(),
  });

  const { data: plans } = useQuery({
    queryKey: QUERY_KEYS.PRICING,
    queryFn: () => getPriceList(),
    select: (data) => {
      const allPlans = data || [];

      return allPlans.filter(
        (item: any) =>
          item.plan_category === "rotating" &&
          item.product_category === "lte" &&
          item.plan_name === "Bandwidth"
      );
    },
  });

  console.log(plans);

  const { data: regionId } = useQuery({
    queryKey: [QUERY_KEYS.LTE_ID, country],
    queryFn: () => getLteRegionId(country!),
    enabled: !!country,
  });

  console.log(regionId);

  const { balance } = useUser();

  const { fetch: couponFetch, loading } = useFetch(getCoupon, false, {
    toastOnError: true,
  });

  const { fetch: createOrderFetch, loading: orderLoading } = useFetch(
    CreateOrder,
    false,
    {
      toastOnError: true,
    }
  );

  useEffect(() => {
    if (regionId?.data?.results) {
      setRegionProxies(regionId.data.results);
    }
  }, [regionId]);

  let selectedPlanPrice = selectedPlan?.price ?? 0;

  const countryOptions = [
    { label: "United States", value: "US" },
    ...(countries?.data
      ? countries.data.map(
          (location: { country_code: number; country: string }) => ({
            label: location.country,
            value: location.country_code,
          })
        )
      : []),
  ];

  const cityOptions = useMemo(() => {
    const locations = regionId?.data?.results;

    if (!locations) return [];

    const uniqueCities = Array.from(
      new Set(
        locations.filter((loc: any) => loc.city).map((loc: any) => loc.city)
      )
    );

    return uniqueCities.map((city) => ({
      label: String(city),
      value: String(city),
    }));
  }, [regionId]);

  const lteOptions = useMemo(() => {
    if (!regionProxies?.length || !city || !port) return [];

    const portLabel = port.toLowerCase() === "socks5" ? "socks5" : "http";

    return regionProxies
      .filter((loc) => {
        const portFromType = loc.proxy_type?.toLowerCase() || "";
        const isSamePort = portFromType.includes(portLabel);
        const isSameCity = loc.city?.toLowerCase() === city.toLowerCase();
        return isSamePort && isSameCity;
      })
      .map((loc) => ({
        label: `IP: ${loc.public_ip} (${loc.proxy_type}) ISP: ${loc.isp}`,
        value: loc.proxy_id.toString(),
      }));
  }, [regionProxies, city, port]);

  const total = selectedPlanPrice * amount;
  const discountedTotal = discount ? total - (discount * total) / 100 : total;

  const onSubmit = async () => {
    if (!selectedPlan) return toast.error("Please select a plan");
    if (balance < discountedTotal) return toast.error("Balance is not enough!");
    if (!selectedProxyId) return toast.error("Please select an LTE proxy");

    const selectedProxy = regionProxies.find(
      (p) => p.proxy_id.toString() === selectedProxyId
    );

    if (!selectedProxy)
      return toast.error("No proxy available for selected LTE proxy");

    try {
      const payload = {
        type: "proxy",
        product: 5,
        plan: selectedPlan.plan_id,
        location: selectedProxy.proxy_id,
        coupon: coupon,
        port: port,
        quantity: amount,
      };

      await createOrderFetch(payload);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LTE_ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_ACCOUNT });

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
            <InputText
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              label="Quantity"
              placeholder="Enter Quantity"
              type="number"
              min={1}
            />
            <Autocomplete
              variant="primary"
              options={lteOptions}
              value={selectedProxyId}
              onChange={({ value }) => setSelectedProxyId(value)}
              label="LTE"
              placeholder="Select LTE"
            />
            <Autocomplete
              variant="primary"
              options={
                plans?.map((plan: any) => ({
                  label: plan.plan_name,
                  value: plan.plan_id,
                })) || []
              }
              value={selectedPlan?.plan_id || ""}
              onChange={({ value }) => {
                const selected = plans?.find((p: any) => p.plan_id === value);
                setSelectedPlan(selected);
              }}
              label="Plan"
              placeholder="Select a Plan"
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
              {orderLoading ? (
                <>
                  <Loader />
                  Purchasing...
                </>
              ) : (
                "Purchase"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default BuySide;
