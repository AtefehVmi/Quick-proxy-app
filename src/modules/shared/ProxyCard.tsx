"use client";

import Card from "@/components/Card/Card";
import TextXs from "@/components/Typography/TextXs";
import cn from "@/utils/cn";
import Image, { StaticImageData } from "next/image";
import CheckIcon from "public/icons/check.svg";
import TextSm from "@/components/Typography/TextSm";
import React, { useState } from "react";
import AngleDownIcon from "public/icons/angle-double-small-down.svg";

type Props = {
  title: string;
  desc: string;
  features: string[];
  image: StaticImageData;
  children?: React.ReactNode;
  collapsible?: boolean;
  className?: string;
};

const ProxyCard: React.FC<Props> = ({
  className,
  title,
  desc,
  image,
  children,
  collapsible = false,
  features,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={cn(className)}>
      <Card className={cn("p-7.5")}>
        <div className="flex items-center flex-col-reverse xl:flex-row gap-5 xl:gap-0">
          <div className="flex-1">
            <p className="text-xl lg:text-2xl font-bold text-white leading-9">
              {title}
            </p>

            <p className="text-base text-white leading-6 mt-4">{desc}</p>

            <div className="mt-4 flex items-center gap-1">
              <TextXs className="text-grey-600">Start from:</TextXs>
              <p className="text-base leading-7 text-white font-semibold">
                $4.5
              </p>
              <TextXs className="text-grey-600">per Proxy</TextXs>
            </div>
          </div>

          <Image
            src={image}
            alt=""
            className="flex-1 max-w-[226px] max-h-[226px]"
            quality={100}
          />
        </div>

        <div className="flex flex-wrap items-center gap-9.25 mt-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckIcon />
              <TextSm className="text-white whitespace-nowrap">
                {feature}
              </TextSm>
            </div>
          ))}
        </div>
      </Card>

      {collapsible ? (
        <div className="bg-black-2 group transition-all">
          {!isOpen && (
            <div
              onClick={toggleDetails}
              className="flex items-center justify-center cursor-pointer list-none mb-2"
            >
              <AngleDownIcon className="my-2 transition-transform duration-300" />
            </div>
          )}

          {isOpen && (
            <div>
              <div className="overflow-hidden">{children}</div>

              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={toggleDetails}
              >
                <AngleDownIcon className="transition-transform duration-300 rotate-180 my-2" />
              </div>
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
export default ProxyCard;
