import cn from "@/utils/cn";
import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={cn("bg-black-3 py-4.5 px-4")}>{children}</div>;
};

export default Card;
