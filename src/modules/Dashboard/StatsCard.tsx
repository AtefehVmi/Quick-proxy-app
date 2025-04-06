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
    <Card className="py-4 px-4.5 relative">
      <p className="text-lg text-grey-500 leading-9">{title}</p>
      <p className="text-grey-100 font-bold text-32 mt-9">{data}</p>

      <Image
        src={bgImage}
        alt=""
        className="absolute top-0 right-0"
        quality={100}
      />
    </Card>
  );
};
export default StatsCard;
