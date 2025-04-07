import cn from "@/utils/cn";
import React, { ReactNode } from "react";

const TextSm = ({
  children,
  className,
  responsive = false,
}: {
  children: ReactNode;
  className?: string;
  responsive?: boolean;
}) => {
  return (
    <p className={cn("text-sm leading-6", responsive && "", className)}>
      {children}
    </p>
  );
};

export default TextSm;
