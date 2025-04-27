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
import { getResiCountries } from "@/services/customApi";

const planOptions = [{ label: "", value: "" }];

const IspSidebar = () => {
  const [amount, setAmount] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>();
  const [plan, setPlan] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const { data: locations } = useQuery({
    queryKey: QUERY_KEYS.RESI_LOCATION,
    queryFn: () => getResiCountries(4),
  });

  const discount = 0;
  const balance = 0;
  let locationOptions = [{ label: "", value: "" }];

  if (locations?.data) {
    locationOptions = locations.data.map(
      (location: { id: number; name: string }) => ({
        label: location.name,
        value: location.id.toString(),
      })
    );
  }

  return (
    <div
      className={cn(
        "bg-black-3 h-full px-8",
        "flex flex-col justify-between gap-6"
      )}
    >
      <div className="">
        <p className="text-white font-bold text-xl leading-7.5 py-6 border-b border-black-border">
          Buy Plan
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <Autocomplete
            variant="primary"
            options={planOptions}
            value={plan}
            onChange={({ value }) => setPlan(value)}
            label="Plan"
            placeholder="Select plan"
          />
          <InputText
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label="Quantity"
            placeholder="Enter"
          />
          <Autocomplete
            variant="primary"
            options={locationOptions}
            value={location}
            onChange={({ value }) => setLocation(value)}
            label="Location"
            placeholder="Select"
          />
          <InputText
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            label="Coupon"
            placeholder="Enter"
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
            {amount ?? 0}
          </TextBase>
        </div>

        <div className="bg-black-border h-px w-full my-6"></div>

        <div className="flex items-center justify-between">
          <p className="text-base text-white leading-6">Total Price</p>
          <p className="text-white font-bold text-32 leading-12">
            $ {amount - (discount ?? 0 * amount) / 100}
          </p>
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
export default IspSidebar;
