import cn from "@/utils/cn";
import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={cn("bg-black-3 p-5", className)}>{children}</div>;
};

export default Card;
