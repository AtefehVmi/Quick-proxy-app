"use client";

import ProxyCard from "@/modules/shared/ProxyCard";
import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import IspIcon from "public/icons/isp.svg";
import DatabaseImage from "public/images/database_monitoring.png";
import PricingPlan from "@/modules/shared/PricingPlan";
import IspSidebar from "@/modules/Products/Isp/IspSidebar";
import { useState } from "react";

const IspProxy = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(0);

  return (
    <div className={cn("w-full", "grid grid-cols-1 xl:grid-cols-24 gap-5")}>
      <div className="xl:col-span-16 px-8 pt-6 pb-8">
        <Heading title="ISP Proxies (Static residential)" Icon={IspIcon} />
        <ProxyCard
          title="ISP (Static Residential) Proxy"
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
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              plan="residential"
              type="Static"
            />
          }
          image={DatabaseImage}
          className="mt-6"
        />
      </div>

      <div className="xl:col-span-8">
        <IspSidebar
          setSelectedPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
      </div>
    </div>
  );
};
export default IspProxy;
