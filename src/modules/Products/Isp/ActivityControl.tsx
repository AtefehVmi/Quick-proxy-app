"use client";

import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import ActivityTable from "./ActivityTable";
import ActivitySidebar from "./ActivitySidebar";
import IspIcon from "public/icons/isp.svg";
import { useState } from "react";
import { IspRecent } from "@/constants/types";

const ActivityControl = () => {
  const [selectedRow, setSelectedRow] = useState<IspRecent | null>(null);

  return (
    <div className={cn("w-full", "grid grid-cols-24 gap-5")}>
      <div className="col-span-16 px-8 pt-6 pb-8">
        <Heading title="ISP Proxies (Static residential)" Icon={IspIcon} />
        <ActivityTable onRowClick={setSelectedRow} className="mt-6" />
      </div>

      <div className="col-span-8">
        <ActivitySidebar data={selectedRow} />
      </div>
    </div>
  );
};
export default ActivityControl;
