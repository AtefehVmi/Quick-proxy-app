"use client";

import cn from "@/utils/cn";
import ActivePlansCard from "./ActivePlansCard";
import GeneratedProxy from "./GeneratedProxy";

const ActivitySidebar = () => {
  const data = ``;

  return (
    <div
      className={cn("bg-black-3 h-screen grow px-8", "flex flex-col gap-12")}
    >
      <div>
        <p className="text-white font-bold text-xl leading-7.5 py-6">Plans</p>
        <ActivePlansCard />
      </div>

      <GeneratedProxy data={data} />
    </div>
  );
};
export default ActivitySidebar;
