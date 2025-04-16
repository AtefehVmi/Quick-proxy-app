"use client";

import { LteRecent } from "@/constants/types";
import ActivePlansCard from "../Isp/ActivePlansCard";
import GeneratedProxy from "../Isp/GeneratedProxy";
import ChevronIcon from "public/icons/chevron-down.svg";
import { useState } from "react";
import cn from "@/utils/cn";

const PlansSide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "pt-6 flex items-center justify-between cursor-pointer",
            isOpen && "pb-6"
          )}
        >
          <p className="text-white font-bold text-xl leading-7.5">Plans</p>
          <ChevronIcon className={cn(isOpen && "rotate-180")} />
        </div>
        {isOpen && <ActivePlansCard />}
      </div>
    </>
  );
};
export default PlansSide;
