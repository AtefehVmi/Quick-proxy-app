import IspSidebar from "@/modules/Products/Isp/IspSidebar";
import ActivityControl from "@/modules/Products/Lte/ActivityControl";
import Heading from "@/modules/shared/Heading";
import PricingPlan from "@/modules/shared/PricingPlan";
import ProxyCard from "@/modules/shared/ProxyCard";
import cn from "@/utils/cn";
import LteIcon from "public/icons/mobile-lte.svg";
import DatabaseImage from "public/images/database_server.png";

const LteProxyPage = () => {
  return (
    <div className={cn("w-full", "grid grid-cols-24 gap-5")}>
      <div className="col-span-16 px-8 pt-6 pb-8">
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
              plans={[
                {
                  days: 1,
                  quantity: 10,
                  discount: 10,
                  price: 12,
                  pricePerMonth: 2,
                },
                {
                  days: 30,
                  quantity: 10,
                  discount: 10,
                  price: 12,
                  pricePerMonth: 2,
                },
                {
                  days: 60,
                  quantity: 10,
                  discount: 10,
                  price: 12,
                  pricePerMonth: 2,
                },
                {
                  days: 120,
                  quantity: 10,
                  discount: 10,
                  price: 12,
                  pricePerMonth: 2,
                },
              ]}
            />
          }
          image={DatabaseImage}
          className="mt-6"
        />
        <ActivityControl />
      </div>

      <div className="col-span-8">
        <IspSidebar />
      </div>
    </div>
  );
};
export default LteProxyPage;
