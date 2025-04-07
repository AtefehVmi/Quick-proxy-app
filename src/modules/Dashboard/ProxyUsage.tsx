"use client";

import Card from "@/components/Card/Card";
import cn from "@/utils/cn";
import ProxyUsageImage from "public/icons/proxy-usage.svg";
import CustomPieChart from "../Charts/CustomPieChart";

const ProxyUsage = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("px-0", className)}>
      <div className="flex items-center gap-2">
        <ProxyUsageImage />
        <p className="text-white text-lg font-bold">Product</p>
      </div>

      <div className="mt-6">
        <CustomPieChart data={[]} />
      </div>
    </Card>
  );
};
export default ProxyUsage;
