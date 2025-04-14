"use client";

import Button from "@/components/Button";
import TextBase from "@/components/Typography/TextBase";
import TextXs from "@/components/Typography/TextXs";
import cn from "@/utils/cn";
import React, { useState } from "react";
import CheckIcon from "public/icons/check-icon.svg";

type Plans = {
  days: number;
  quantity: number;
  discount: number;
  price: number;
  pricePerMonth: number;
};

type Props = { plans: Plans[] };

const PricingPlan: React.FC<Props> = ({ plans }) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(
    null
  );

  return (
    <div className="bg-black-2">
      <p
        className={cn(
          "text-xl font-bold leading-7.5 text-white",
          "pl-7.5 pt-7.5 pb-6"
        )}
      >
        Pricing Plan
      </p>

      <div className="border-t border-t-black-border border-b border-b-black">
        <div className="grid grid-cols-4 mx-7">
          {plans.map((plan, index) => (
            <div key={`${plan.days}-${index}`}>
              <div className="flex items-center justify-center gap-2.5 border-x border-b border-black-border py-10.5">
                <Button
                  onClick={() =>
                    setSelectedPlanIndex(
                      index === selectedPlanIndex ? null : index
                    )
                  }
                  className="p-1"
                  variant={index === selectedPlanIndex ? "primary" : "checkbox"}
                >
                  <CheckIcon />
                </Button>
                <p className="text-white font-bold text-xl leading-7.5">
                  {plan.days} Day
                </p>
              </div>

              <div
                className={cn(
                  "my-9.5 flex flex-col items-center gap-5.5 border-black-border",
                  index !== plans.length - 1 && "border-r"
                )}
              >
                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Quantity :</TextXs>
                  <TextBase className="text-white font-semibold">
                    {plan.quantity}
                  </TextBase>
                </div>

                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Discount :</TextXs>
                  <TextBase className="text-white font-semibold">
                    {plan.discount}%
                  </TextBase>
                </div>

                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Price :</TextXs>
                  <TextBase className="text-white font-semibold">
                    ${plan.price}
                  </TextBase>
                </div>

                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Price / per month :</TextXs>
                  <TextBase className="text-white font-semibold">
                    ${plan.pricePerMonth}
                  </TextBase>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PricingPlan;
