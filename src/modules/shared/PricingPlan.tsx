"use client";

import Button from "@/components/Button";
import TextBase from "@/components/Typography/TextBase";
import TextXs from "@/components/Typography/TextXs";
import cn from "@/utils/cn";
import React, { useState } from "react";
import CheckIcon from "public/icons/check-icon.svg";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import { getPriceList } from "@/services/customApi";

type Plans = {
  days: number;
  quantity: number;
  discount: number;
  price: number;
  pricePerMonth: number;
};

type Props = {
  plan: "residential" | "lte";
  type: "Static" | "Rotating" | "LTE Proxy";
  setSelectedPlan?: (plan: any) => void;
};

const PricingPlan: React.FC<Props> = ({ plan, type, setSelectedPlan }) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(0);

  const {
    data: plans,
    error,
    isLoading,
  } = useQuery({
    queryKey: [...QUERY_KEYS.PRICING, plan, type],
    queryFn: () => getPriceList(),
    select: (data) => {
      const products = data?.data?.products || [];

      if (!products) return [];

      const matchingProduct = products.find((product) => product.id === plan);
      const matchingType = matchingProduct?.types.find(
        (planType) => planType.name === type
      );
      return matchingType?.plans || [];
    },
  });

  console.log(plans);

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-0 mx-7">
          {plans?.map((plan, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  const newIndex = index === selectedPlanIndex ? null : index;
                  setSelectedPlanIndex(newIndex);
                  setSelectedPlan?.(newIndex !== null ? plan : null);
                }}
                className={cn(
                  "flex whitespace-nowrap items-center justify-center gap-2.5 cursor-pointer",
                  "border-x border-b border-t border-black-border py-10.5",
                  index === selectedPlanIndex
                    ? "border-primary-400 border-t bg-black-border"
                    : "lg:border-t-transparent"
                )}
              >
                <Button
                  className="p-1"
                  variant={index === selectedPlanIndex ? "primary" : "checkbox"}
                >
                  <CheckIcon />
                </Button>
                <p className="text-white font-bold text-xl leading-7.5">
                  {plan.name}
                </p>
              </div>

              <div
                className={cn(
                  "py-9.5 flex flex-col items-center gap-5.5 border-black-border border-t border-b lg:border-b-0",
                  "border-r border-l lg:border-l-0",
                  index === plans.length - 1 && "lg:border-r-transparent"
                )}
              >
                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Quantity :</TextXs>
                  <TextBase className="text-white font-semibold">10</TextBase>
                </div>

                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Discount :</TextXs>
                  <TextBase className="text-white font-semibold">10%</TextBase>
                </div>

                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Price :</TextXs>
                  <TextBase className="text-white font-semibold">
                    ${plan.price}
                  </TextBase>
                </div>

                <div className="flex items-center gap-1">
                  <TextXs className="text-white">Price / per month :</TextXs>
                  <TextBase className="text-white font-semibold">$2</TextBase>
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
