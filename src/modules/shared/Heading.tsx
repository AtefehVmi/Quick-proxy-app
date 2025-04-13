import React, { FC, SVGProps } from "react";
import CalendarIcon from "public/icons/calendar.svg";
import TextSm from "@/components/Typography/TextSm";

type HeadingProps = { Icon: FC<SVGProps<SVGElement>>; title: string };

const Heading: React.FC<HeadingProps> = ({ Icon, title }) => {
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const today = new Date();
    return today.toLocaleDateString("en-GB", options).toUpperCase();
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="bg-primary-400">
          <Icon className="m-3" />
        </div>

        <div>
          <p className="text-white font-bold text-2xl">{title}</p>
          <p className="text-base text-grey-600">Welcome Back to Fastproxy</p>
        </div>
      </div>
      <div className="bg-black-2 py-4 px-8 flex items-center gap-1">
        <CalendarIcon />
        <TextSm className="text-white font-semibold">
          {getFormattedDate()}
        </TextSm>
      </div>
    </div>
  );
};
export default Heading;
