import React, { FC, SVGProps } from "react";

type HeadingProps = { Icon: FC<SVGProps<SVGElement>>; title: string };

const Heading: React.FC<HeadingProps> = ({ Icon, title }) => {
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
      <div></div>
    </div>
  );
};
export default Heading;
