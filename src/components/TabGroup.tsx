"use client";
import cn from "@/utils/cn";
import React, { useEffect, useState } from "react";

interface TabGroupProps {
  tabs: Array<{
    id: number;
    header: string | React.ReactNode;
    content: React.ReactNode;
  }>;
  className?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]);

  useEffect(() => {}, [tabs]);

  return (
    <div className={`flex flex-col bg-black-3 ${className}`}>
      <div className="flex w-full overflow-auto scrollbar-hide whitespace-nowrap px-4 pt-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={cn(
              "border px-5.5 py-5 text-sm leading-6 cursor-pointer text-white bg-black",
              activeTab.id === tab.id ? "border-primary-400" : "border-white/10"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab.header}
          </div>
        ))}
      </div>
      <div className="mt-5.5">{activeTab.content}</div>
    </div>
  );
};

export default TabGroup;
