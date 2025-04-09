import cn from "@/utils/cn";
import React, { ReactNode } from "react";

const TextBase = ({
  children,
  className,
  responsive = false,
}: {
  children: ReactNode;
  className?: string;
  responsive?: boolean;
}) => {
  return (
    <p className={cn("text-base leading-7", responsive && "", className)}>
      {children}
    </p>
  );
};

export default TextBase;
