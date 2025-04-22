import cn from "@/utils/cn";
import React, { ReactNode } from "react";

const H1 = ({
  children,
  className,
  responsive = false,
}: {
  children: ReactNode;
  className?: string;
  responsive?: boolean;
}) => {
  return (
    <p
      className={cn(
        "text-32 leading-12 font-bold",
        responsive && "",
        className
      )}
    >
      {children}
    </p>
  );
};

export default H1;
