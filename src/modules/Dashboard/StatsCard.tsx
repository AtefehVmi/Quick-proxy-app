import Card from "@/components/Card/Card";
import Image, { StaticImageData } from "next/image";
import React from "react";

type StatsCardProps = {
  title: string;
  bgImage: StaticImageData;
  data: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, bgImage, data }) => {
  return (
    <Card className="py-4 px-4.5 relative z-0 overflow-hidden group cursor-pointer">
      <p className="text-lg text-grey-500 leading-9">{title}</p>
      <p className="text-grey-100 font-bold text-2xl 2xl:text-32 mt-9">
        {data}
      </p>

      <Image
        src={bgImage}
        alt=""
        className="absolute -top-7.5 -right-7.5 -z-20 transition-all duration-300 group-hover:-top-2.5 group-hover:-right-2.5"
        quality={100}
      />
    </Card>
  );
};
export default StatsCard;
