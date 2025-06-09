import Locations from "@/modules/Products/RotatingResi/Locations";
import ProxyCard from "@/modules/shared/ProxyCard";
import ProxyGenerator from "@/modules/Products/RotatingResi/ProxyGenerator";
import RotatingSidebar from "@/modules/Products/RotatingResi/RotatingSidebar";
import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import RotatingResiIcon from "public/icons/rotating-resi.svg";
import DatabaseImage from "public/images/database_folders.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fastproxy.gg | Rotating Residential",
};

const RotatingResidential = () => {
  return (
    <div className={cn("w-full", "grid grid-cols-1 xl:grid-cols-24 gap-5")}>
      <div className="xl:col-span-16 px-8 pt-6 pb-8">
        <Heading title="Rotating Residential" Icon={RotatingResiIcon} />
        <ProxyCard
          image={DatabaseImage}
          features={[
            "Premium ISP providers",
            "Unlimited traffic",
            "State and city targeting",
            "31+ countries covered",
            "SOCKS5 support",
          ]}
          title="Rotating Residential Proxy"
          desc="Bypass toughest targets using trusted ASN provider IPs and  unlimited-duration sessions. ISP (Static Residential) proxies have 99.9% success rate with most popular targets. Get proxies with exceptional  speed and transparent pricing."
          className="mt-6"
        />
        <Locations className="mt-5" />
        <ProxyGenerator className="mt-6" />
      </div>

      <div className="xl:col-span-8">
        <RotatingSidebar />
      </div>
    </div>
  );
};
export default RotatingResidential;
