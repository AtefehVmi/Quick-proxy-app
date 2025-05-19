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
import { getCoupon } from "@/services/api";
import { useBalance } from "@/hooks/useBalance";
import { toast } from "react-toastify";

const RotatingSidebar = () => {
  const [amount, setAmount] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>();
  const [couponChecked, setCouponChecked] = useState(false);
  const [discount, setDiscount] = useState<number>(0);

  const { fetch: couponFetch, loading } = useFetch(getCoupon, false, {
    toastOnError: true,
  });

  const { balance } = useBalance();

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
        "bg-black-3 h-full grow px-8",
        "flex flex-col justify-between"
      )}
    >
      <div className="">
        <Bandwidth />

        <p className="text-white font-bold text-lg lg:text-xl leading-7.5 py-6 border-b border-black-border">
          Get Started
        </p>

        <div className="mt-8">
          <InputText
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label="Amount"
            placeholder="Enter Amount"
            className="w-full"
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

            <Button variant="black">Add charge</Button>
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
          Subscription Summary
        </p>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-white text-base leading-6">Price</p>
          <TextBase className="font-semibold text-white">
            $ {amount ?? 0}
          </TextBase>
        </div>

        {discount ?? (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-primary-200 text-base leading-6">Discount</p>
            <TextBase className="font-semibold text-primary-200">
              {discount}%
            </TextBase>
          </div>
        )}

        <div className="bg-black-border h-px w-full my-6"></div>

        <div className="flex items-center justify-between">
          <p className="text-base text-white leading-6">Total Price</p>
          <p className="text-white font-bold text-32 leading-12">$ {amount}</p>
        </div>

        <div className="mt-6">
          <Button className="font-semibold w-full py-4" RightIcon={ArrowIcon}>
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};
export default RotatingSidebar;
