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
          title="Rotating Residential"
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
          title="Static Residential"
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
      header: "Static Datacenter",
      content: (
        <ProxyCardContent
          title="Static Datacenter"
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
      id: 4,
      header: "Rotating Datacenter",
      content: (
        <ProxyCardContent
          title="Rotating Datacenter"
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
      id: 5,
      header: "Rotating Mobile",
      content: (
        <ProxyCardContent
          title="Rotating Mobile"
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
      id: 6,
      header: "Static Mobile",
      content: (
        <ProxyCardContent
          title="Static Mobile"
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
