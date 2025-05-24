"use client";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import TextBase from "@/components/Typography/TextBase";
import cn from "@/utils/cn";
import { useState } from "react";
import WalletIcon from "public/icons/wallet-small.svg";
import ArrowIcon from "public/icons/arrow-small-right.svg";
import Autocomplete from "@/components/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import { CreateOrder, getIspCountries } from "@/services/customApi";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { getCoupon, getPriceList } from "@/services/api";
import BalanceModal from "@/modules/Modals/BalanceModal";
import { useUser } from "@/hooks/useUser";

const IspSidebar = ({
  selectedPlan,
  setSelectedPlan,
}: {
  selectedPlan: any;
  setSelectedPlan: (plan: any) => void;
}) => {
  const [amount, setAmount] = useState<number>(1);
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [couponChecked, setCouponChecked] = useState(false);

  const { data: locations } = useQuery({
    queryKey: QUERY_KEYS.ISP_LOCATION,
    queryFn: () => getIspCountries(4),
  });

  const { data: plans } = useQuery({
    queryKey: QUERY_KEYS.PRICING,
    queryFn: () => getPriceList(),
    select: (data) => {
      const allPlans = data || [];

      return allPlans.filter(
        (item: any) =>
          item.plan_category === "static" &&
          item.product_category === "residential"
      );
    },
  });

  const { balance } = useUser();

  const { fetch: createOrderFetch } = useFetch(CreateOrder, false, {
    toastOnError: true,
  });

  const { fetch: couponFetch, loading } = useFetch(getCoupon, false, {
    toastOnError: true,
  });

  let planOptions = [{ label: "", value: "" }];
  let selectedPlanPrice = 0;

  if (plans) {
    planOptions = plans.map((plan: { id: string; plan_name: string }) => ({
      label: plan.plan_name,
      value: plan.id.toString(),
    }));

    if (selectedPlan) {
      selectedPlanPrice = selectedPlan.price ?? 0;
    }
  }

  let locationOptions = [{ label: "", value: "" }];

  if (locations?.data) {
    locationOptions = locations.data.map(
      (location: { id: number; name: string }) => ({
        label: location.name,
        value: location.id,
      })
    );
  }

  const total = selectedPlanPrice * amount;
  const discountedTotal = discount ? total - (discount * total) / 100 : total;

  const onSubmit = async () => {
    const selectedPlanObj = plans?.find(
      (p) => p.id.toString() === selectedPlan
    );
    if (!selectedPlanObj) return toast.error("Please select a plan");
    if (balance < discountedTotal) return toast.error("Balance is not enough!");

    const payload = {
      type: "proxy",
      product: selectedPlanObj.typeId,
      plan: selectedPlanObj.id,
      quantity: amount,
      location,
      coupon,
    };

    await createOrderFetch(payload);
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
    <div
      className={cn(
        "bg-black-3 h-full px-8",
        "flex flex-col justify-between gap-6"
      )}
    >
      <div>
        <p className="text-white font-bold text-xl leading-7.5 py-6 border-b border-black-border">
          Buy Plan
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <Autocomplete
            variant="primary"
            options={planOptions}
            value={selectedPlan?.id?.toString() || ""}
            onChange={({ value }) => {
              const selected = plans?.find((p) => p.id.toString() === value);
              if (selected) {
                setSelectedPlan(selected);
              }
            }}
            label="Plan"
            placeholder="Select plan"
          />

          <InputText
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label="Quantity"
            placeholder="Enter Quantity"
            type="number"
          />
          <Autocomplete
            variant="primary"
            options={locationOptions}
            value={location}
            onChange={({ value }) => setLocation(value)}
            label="Location"
            placeholder="Select Location"
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

        {balance < amount && (
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
          <TextBase className="font-semibold text-white">${total}</TextBase>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-white text-base leading-6">Number of Proxy</p>
          <TextBase className="font-semibold text-white">{amount}</TextBase>
        </div>

        {discount > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-primary-200 text-base leading-6">Discount</p>
            <TextBase className="font-semibold text-primary-200">
              {discount}%
            </TextBase>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <p className="text-white text-base leading-6">
            Proxy Price per month
          </p>
          <TextBase className="font-semibold text-white">
            ${selectedPlanPrice}
          </TextBase>
        </div>

        <div className="bg-black-border h-px w-full my-6" />

        <div className="flex items-center justify-between">
          <p className="text-base text-white leading-6">Total Price</p>
          <p className="text-white font-bold text-32 leading-12">
            ${discountedTotal}
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
    </div>
  );
};

export default IspSidebar;
