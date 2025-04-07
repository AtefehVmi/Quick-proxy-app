import cn from "@/utils/cn";
import React, { ReactNode } from "react";

const TextXs = ({
  children,
  className,
  responsive = false,
}: {
  children: ReactNode;
  className?: string;
  responsive?: boolean;
}) => {
  return (
    <p className={cn("text-xs leading-4.5", responsive && "", className)}>
      {children}
    </p>
  );
};

export default TextXs;
