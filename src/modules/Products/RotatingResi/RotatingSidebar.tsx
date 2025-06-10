"use client";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import TextBase from "@/components/Typography/TextBase";
import cn from "@/utils/cn";
import { useState } from "react";
import WalletIcon from "public/icons/wallet-small.svg";
import ArrowIcon from "public/icons/arrow-small-right.svg";
import Bandwidth from "./Bandwidth";
import useFetch from "@/hooks/useFetch";
import { getCoupon, getPriceList } from "@/services/api";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import Loader from "@/components/Loader";
import { CreateOrder, getUserDetails } from "@/services/customApi";
import SuccessPayment from "@/modules/Modals/SuccessPayment";

const RotatingSidebar = () => {
  const [amount, setAmount] = useState<number>(1);
  const [coupon, setCoupon] = useState<string>();
  const [couponChecked, setCouponChecked] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const { fetch: createOrderFetch, loading: loadingOrder } = useFetch(
    CreateOrder,
    false,
    {
      toastOnError: true,
    }
  );
  const queryClient = useQueryClient();

  const { fetch: couponFetch, loading } = useFetch(getCoupon, false, {
    toastOnError: true,
  });

  const { data: plans, isLoading } = useQuery({
    queryKey: QUERY_KEYS.PRICING,
    queryFn: () => getPriceList(),
    select: (data) => {
      const allPlans = data || [];
      return allPlans.filter(
        (item: any) =>
          item.plan_category === "rotating" &&
          item.product_category === "residential"
      );
    },
  });

  const price = plans?.[0]?.price;

  const { balance, refetch, id } = useUser();

  const userDetailsQuery = useQuery({
    queryKey: QUERY_KEYS.USER_DETAILS,
    queryFn: () => getUserDetails(id!),
    enabled: false,
  });

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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (amount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

    try {
      const payload = {
        type: "proxy",
        quantity: amount,
        product: 9,
        plan: 20,
      };
      await createOrderFetch(payload);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      refetch();
      await userDetailsQuery.refetch();

      toast.success("Bandwidth added successfully!");
    } catch (error) {
      console.log("failed", error);
    }
  };

  const total = price * amount;
  const discountedTotal = discount ? total - (discount * total) / 100 : total;

  return (
    <div
      className={cn(
        "bg-black-3 h-full grow px-8",
        "flex flex-col justify-between"
      )}
    >
      <div className="">
        <Bandwidth />

        <p className="text-white font-bold text-lg lg:text-xl leading-7.5 py-6 border-b border-black-border">
          Purchase Bandwidth
        </p>

        <div className="mt-8">
          <InputText
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label="Amount"
            placeholder="Enter Amount"
            className="w-full"
            type="number"
            error={amount <= 0}
            description={amount <= 0 ? "Amount must be greater than 0" : ""}
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
            className="mt-6 w-full"
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

        {balance < discountedTotal && (
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

            <Button variant="black">Top up Balance</Button>
          </div>
        )}
      </div>

      <div className="bg-black-2 p-4.5 mb-8 mt-8 xl:mt-0">
        <p
          className={cn(
            "text-base leading-7 text-grey-100 font-semibold",
            "pb-4.5 border-b border-black-border"
          )}
        >
          Order Summary
        </p>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-white text-base leading-6">Price</p>
          <TextBase className="font-semibold text-white">
            {isLoading ? <Loader /> : `$${price?.toFixed(2) ?? "0.00"}`}
          </TextBase>
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
          <p className="text-white text-base leading-6">Quantity</p>
          <TextBase className="font-semibold text-white">{amount}</TextBase>
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
            onClick={onSubmit}
            disabled={balance < discountedTotal || amount <= 0}
            className="font-semibold w-full py-4"
            RightIcon={ArrowIcon}
          >
            {loadingOrder ? (
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
    </div>
  );
};
export default RotatingSidebar;
