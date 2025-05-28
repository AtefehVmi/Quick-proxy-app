import React, { FC, SVGProps } from "react";
import InfoIcon from "public/icons/info.svg";
import TextSm from "@/components/Typography/TextSm";
import cn from "@/utils/cn";
import Link from "next/link";

type Props = {
  title: string;
  desc: string;
  Icon: FC<SVGProps<SVGElement>>;
  onClick?: () => void;
  isActive: boolean;
  href: string;
};

const ProductCard: React.FC<Props> = ({
  title,
  desc,
  Icon,
  onClick,
  isActive,
  href,
}) => {
  return (
    <Link
      href={href}
      className={`bg-black border border-black-2 min-w-[240px] w-full ${
        isActive ? "border-primary-400" : ""
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className="mx-4 mt-4 mb-9.75">
        <div
          className={cn(
            "w-10 h-10 flex items-center justify-center",
            isActive ? "bg-primary-400" : "bg-black-2"
          )}
        >
          <Icon className={cn(isActive ? "text-black" : "text-grey-700")} />
        </div>
        <p className="mt-4 text-base leading-7 text-white font-semibold">
          {title}
        </p>
        <TextSm className="text-grey-600 mt-0.5">{desc}</TextSm>
      </div>

      <div
        className={cn(
          "flex items-center justify-between px-4.25 py-2",
          isActive ? "bg-primary-400 text-black" : "bg-black-2 text-grey-500"
        )}
      >
        <TextSm className="font-semibold">Learn More</TextSm>
        <InfoIcon />
      </div>
    </Link>
  );
};

export default ProductCard;
