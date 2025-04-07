"use client";

import React, { useState } from "react";
import cn from "@/utils/cn";
import ChevronIcon from "public/icons/angle-small-right.svg";
import ProductCard from "./ProductCard";
import RotatingResiIcon from "public/icons/map-home.svg";
import RotatingDataIcon from "public/icons/database.svg";
import StaticResiIcon from "public/icons/location.svg";
import StaticDataIcon from "public/icons/network.svg";
import MobileIcon from "public/icons/mobile.svg";

const Products = ({ className }: { className?: string }) => {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const handleProductClick = (product: string) => {
    setActiveProduct(activeProduct === product ? null : product);
  };

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-white">Products</p>
        <div className={cn("flex items-center gap-1 *:bg-black-2")}>
          <div className="w-10 h-10 flex items-center justify-center">
            <ChevronIcon className="rotate-180 cursor-pointer" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <ChevronIcon className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-6 overflow-auto scrollbar-hide">
        <ProductCard
          Icon={RotatingResiIcon}
          title="Rotating Residential"
          desc="Protect your data with encrypted connections."
          onClick={() => handleProductClick("RotatingResi")}
          isActive={activeProduct === "RotatingResi"}
        />

        <ProductCard
          Icon={StaticResiIcon}
          title="Static Residential"
          desc="Protect your data with encrypted connections."
          onClick={() => handleProductClick("StaticResi")}
          isActive={activeProduct === "StaticResi"}
        />

        <ProductCard
          Icon={StaticDataIcon}
          title="Static Datacenter"
          desc="Protect your data with encrypted connections."
          onClick={() => handleProductClick("StaticData")}
          isActive={activeProduct === "StaticData"}
        />

        <ProductCard
          Icon={RotatingDataIcon}
          title="Rotating Datacenter"
          desc="Protect your data with encrypted connections."
          onClick={() => handleProductClick("RotatingData")}
          isActive={activeProduct === "RotatingData"}
        />

        <ProductCard
          Icon={MobileIcon}
          title="Static Mobile"
          desc="Protect your data with encrypted connections."
          onClick={() => handleProductClick("StaticMobile")}
          isActive={activeProduct === "StaticMobile"}
        />

        <ProductCard
          Icon={MobileIcon}
          title="Rotating Mobile"
          desc="Protect your data with encrypted connections."
          onClick={() => handleProductClick("RotatingMobile")}
          isActive={activeProduct === "RotatingMobile"}
        />
      </div>
    </div>
  );
};

export default Products;
