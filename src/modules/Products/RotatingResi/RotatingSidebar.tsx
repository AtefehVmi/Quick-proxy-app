"use client";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import TextBase from "@/components/Typography/TextBase";
import cn from "@/utils/cn";
import { useState } from "react";
import WalletIcon from "public/icons/wallet-small.svg";

const RotatingSidebar = () => {
  const [amount, setAmount] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>();

  const discount = "";
  const balance = 0;

  return (
    <div
      className={cn(
        "bg-black-3 h-[calc(100vh_-_100px)] grow px-8",
        "flex flex-col justify-between"
      )}
    >
      <div className="pt-6">
        <p className="text-white font-bold text-xl leading-7.5 pb-6 border-b border-black-border">
          Get Started
        </p>

        <div className="mt-8">
          <InputText
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label="Amount"
            placeholder="Enter"
            className="w-full"
          />
          <InputText
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            label="Coupon"
            placeholder="Enter"
            className="mt-6 w-full"
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
            $ {amount ?? 0}
          </TextBase>
        </div>

        {discount ?? (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-primary-200 text-base leading-6">Discount</p>
            <TextBase className="font-semibold text-primary-200">20%</TextBase>
          </div>
        )}

        <div className="bg-black-border h-px w-full my-6"></div>

        <div className="flex items-center justify-between">
          <p className="text-base text-white leading-6">Total Price</p>
          <p className="text-white font-bold text-32 leading-12">$ 16.98</p>
        </div>

        <div className="mt-6">
          <Button className="font-semibold w-full py-4">Purchase</Button>
        </div>
      </div>
    </div>
  );
};
export default RotatingSidebar;
