"use client";

import cn from "@/utils/cn";
import React, { useState } from "react";
import { Range } from "react-range";
import CaretIcon from "public/icons/caret-right.svg";
import Image from "next/image";
import GlobeImage from "public/images/globe.png";
import Button from "@/components/Button";
import CaretBigIcon from "public/icons/caret-right-big.svg";

type Props = { title: string; features: string[] };

const ProxyCardContent: React.FC<Props> = ({ title, features }) => {
  const [gigRange, setGigRange] = useState([100]);

  function onChangeGig(values: number[]) {
    setGigRange(values);
  }
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="pl-4 pb-4 pr-7.5 col-span-2">
          <div className="w-full mt-6">
            <div className="w-full h-auto">
              <Range
                values={gigRange}
                step={1}
                min={1}
                max={500}
                onChange={onChangeGig}
                renderTrack={({ props, children }) => {
                  const percentage = ((gigRange[0] - 1) / (500 - 1)) * 100;
                  return (
                    <div
                      {...props}
                      className="relative h-2.5 w-full max-w-[638px]"
                      style={props.style}
                    >
                      <div
                        className="absolute h-full bg-primary-400"
                        style={{ width: `${percentage}%` }}
                      />
                      <div
                        className="absolute h-full bg-black right-0"
                        style={{ width: `${100 - percentage}%` }}
                      />
                      {children}
                    </div>
                  );
                }}
                // TODO: Rotate thumb
                renderThumb={({ props, index }) => {
                  const { key, ...restProps } = props;
                  return (
                    <div
                      key={key}
                      {...restProps}
                      className={cn(
                        "relative w-7.5 h-7.5 border-4 border-black bg-primary-400 outline-2 outline-white",
                        ""
                      )}
                    >
                      {/* Tooltip */}
                      <div
                        className={cn(
                          "absolute -top-1 left-7 px-5 py-1.25 bg-black-2 border border-black text-white text-sm",
                          "shadow-tooltip"
                        )}
                      >
                        {gigRange[index]}GB
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div className="mt-6 w-full bg-black flex items-center justify-between px-4 py-2">
            <p className="text-sm text-grey-600 leading-6">$5 per GB</p>
            <p className="text-lg leading-8 font-bold text-white">$456</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-y-5">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CaretIcon />
                <p className="text-sm lg:text-base text-white leading-6">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-400 col-span-1 relative h-full">
          <Image src={GlobeImage} alt="" className="absolute top-0 left-0" />
          <div className="px-10 pt-10 pb-11 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-black leading-6">Price per proxy</p>
                <p className="text-lg text-black leading-8 font-bold">$6.50</p>
              </div>
              <div className="flex justify-between items-center mt-6.5">
                <p className="text-sm text-black leading-6">Discount</p>
                <p className="text-lg text-black leading-8 font-bold">10%</p>
              </div>
              <div className="flex justify-between items-center mt-6.5">
                <p className="text-sm text-black leading-6">Total</p>
                <p className="text-lg text-black leading-8 font-bold">$5.85</p>
              </div>
            </div>
            <Button
              variant="black"
              RightIcon={CaretBigIcon}
              className="py-3 mt-12"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProxyCardContent;
