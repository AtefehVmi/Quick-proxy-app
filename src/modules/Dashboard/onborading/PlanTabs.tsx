import cn from "@/utils/cn";
import TabGroup from "@/components/TabGroup";
import ProxyCardContent from "./ProxyCardContent";

const PlanTabs = ({ className }: { className?: string }) => {
  const tabs = [
    {
      id: 1,
      header: "Rotating Residential",
      content: (
        <ProxyCardContent
          type="rotatingresidential"
          features={[
            "34 Million IP Pool",
            "Traffic Never Expires",
            "all 195 countries",
            "City/State Targeting",
            "IPv6 Supported",
            "IPv4 Supported",
            "No Connection Limits",
            "Sticky Sessions",
          ]}
        />
      ),
    },
    {
      id: 2,
      header: "Static Residential",
      content: (
        <ProxyCardContent
          type="staticresidential"
          features={[
            "34 Million IP Pool",
            "Traffic Never Expires",
            "all 195 countries",
            "City/State Targeting",
            "IPv6 Supported",
            "IPv4 Supported",
            "No Connection Limits",
            "Sticky Sessions",
          ]}
        />
      ),
    },
    {
      id: 3,
      header: "Mobile/LTE",
      content: (
        <ProxyCardContent
          type="IP Reveal"
          features={[
            "34 Million IP Pool",
            "Traffic Never Expires",
            "all 195 countries",
            "City/State Targeting",
            "IPv6 Supported",
            "IPv4 Supported",
            "No Connection Limits",
            "Sticky Sessions",
          ]}
        />
      ),
    },
  ];
  return (
    <div className={cn(className)}>
      <TabGroup tabs={tabs} />
    </div>
  );
};
export default PlanTabs;
