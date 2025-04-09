import Card from "@/components/Card/Card";
import TextXs from "@/components/Typography/TextXs";
import cn from "@/utils/cn";
import Image from "next/image";
import DatabaseImage from "public/images/database_folders.png";
import CheckIcon from "public/icons/check.svg";
import TextSm from "@/components/Typography/TextSm";

const features = [
  "Premium ISP providers",
  "Unlimited traffic",
  "State and city targeting",
  "31+ countries covered",
  "SOCKS5 support",
];

const ProxyCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("p-7.5", className)}>
      <div className="flex">
        <div className="flex-1">
          <p className="text-2xl font-bold text-white leading-9">
            Rotating Residential Proxy
          </p>

          <p className="text-base text-white leading-6 mt-4">
            Bypass toughest targets using trusted ASN provider IPs and
            unlimited-duration sessions. ISP (Static Residential) proxies have
            99.9% success rate with most popular targets. Get proxies with
            exceptional speed and transparent pricing.
          </p>

          <div className="mt-4 flex items-center gap-1">
            <TextXs className="text-grey-600">Start from:</TextXs>
            <p className="text-base leading-7 text-white font-semibold">$4.5</p>
            <TextXs className="text-grey-600">per Proxy</TextXs>
          </div>
        </div>

        <Image
          src={DatabaseImage}
          alt=""
          className="flex-1 max-w-[226px] max-h-[226px]"
          quality={100}
        />
      </div>

      <div className="flex flex-wrap items-center gap-9.25 mt-10">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckIcon />
            <TextSm className="text-white whitespace-nowrap">{feature}</TextSm>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default ProxyCard;
