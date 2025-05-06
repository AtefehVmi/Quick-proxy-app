"use client";

import cn from "@/utils/cn";
import React, { useState } from "react";

type FilterProps = { filterItems: string[] };

const Filter: React.FC<FilterProps> = ({ filterItems }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(
    filterItems[0]
  );

  const handleFilterClick = (item: string) => {
    setActiveFilter(item === activeFilter ? null : item);
  };

  return (
    <div className="flex items-center pl-4 md:pl-0 md:justify-center gap-2 overflow-auto scrollbar-hide">
      {filterItems.map((item, index) => (
        <div
          onClick={() => handleFilterClick(item)}
          key={index}
          className={cn(
            "py-2 px-8 whitespace-nowrap text-sm font-semibold cursor-pointer",
            item === activeFilter
              ? "bg-black text-primary-400"
              : "bg-black-2 text-white"
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
export default Filter;
