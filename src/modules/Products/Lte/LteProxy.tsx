"use client";

import Heading from "@/modules/shared/Heading";
import PricingPlan from "@/modules/shared/PricingPlan";
import ProxyCard from "@/modules/shared/ProxyCard";
import ActivityControl from "./ActivityControl";
import LteSidebar from "./LteSidebar";
import cn from "@/utils/cn";
import LteIcon from "public/icons/mobile-lte.svg";
import DatabaseImage from "public/images/database_server.png";
import { useState } from "react";
import { LteRecent } from "@/constants/types";

const LteProxy = () => {
  const [selectedRow, setSelectedRow] = useState<LteRecent | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(0);

  return (
    <div className={cn("w-full", "grid grid-cols-1 xl:grid-cols-24 gap-5")}>
      <div className="xl:col-span-16 px-8 pt-6 pb-8">
        <Heading title=" Mobile LTE" Icon={LteIcon} />
        <ProxyCard
          title=" Mobile LTE"
          desc="Bypass toughest targets using trusted ASN provider IPs and  unlimited-duration sessions. ISP (Static Residential) proxies have 99.9% success rate with most popular targets. Get proxies with exceptional  speed and transparent pricing."
          features={[
            "Premium ISP providers",
            "Unlimited traffic",
            "State and city targeting",
            "31+ countries covered",
            "SOCKS5 support",
          ]}
          collapsible={true}
          children={
            <PricingPlan
              setSelectedPlan={setSelectedPlan}
              plan="lte"
              type="Rotating"
            />
          }
          image={DatabaseImage}
          className="mt-6"
        />
        <ActivityControl
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </div>

      <div className="xl:col-span-8">
        <LteSidebar selectedPlan={selectedPlan} />
      </div>
    </div>
  );
};

export default LteProxy;
