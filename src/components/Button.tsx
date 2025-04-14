import Link, { LinkProps } from "next/link";
import React from "react";
import Loader from "./Loader/Loader";
import { UrlObject } from "url";
import cn from "@/utils/cn";

type Url = string | UrlObject;

type CustomProps = {
  variant?: "primary" | "outlined" | "black" | "ghost" | "checkbox";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  Icon?: React.ElementType;
  children?: React.ReactNode;
  RightIcon?: React.ElementType;
};

// Define the props for the anchor tag
type AnchorProps = CustomProps & Omit<LinkProps, keyof CustomProps | "href">;

// Define the props for the button tag
type ButtonProps = CustomProps &
  Omit<React.ComponentProps<"button">, keyof CustomProps>;

// Define the conditional props type
type PropsType =
  | ({ href: Url } & AnchorProps) // If href is provided, only AnchorProps are allowed
  | ({ href?: undefined } & ButtonProps); // If href is undefined, only ButtonProps are allowed

const Button = ({
  href,
  variant = "primary",
  className,
  Icon,
  RightIcon,
  children,
  loading,
  disabled,
  ...props
}: PropsType) => {
  const baseStyle =
    "flex items-center justify-center gap-2.5 cursor-pointer text-center text-sm leading-4 font-medium disabled:cursor-default";

  const variantStyle = cn(
    variant === "primary" &&
      "bg-primary-400 text-black hover:bg-primary-500 disabled:bg-black-3",
    variant === "outlined" &&
      "border border-primary-400 text-primary-500 bg-transparent hover:bg-black-3",
    variant === "black" &&
      "bg-black-2 text-white hover:bg-black-3 hover:text-primary-400",
    variant === "ghost" &&
      "bg-transparent text-white hover:text-primary-400 hover:bg-black-3",
    variant === "checkbox" && "bg-black-border text-grey-700 hover:bg-black"
  );

  const isDisabled = loading || disabled;

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyle, variantStyle, className)}
        {...(props as AnchorProps)}
      >
        {Icon && <Icon />}
        {children}
        {RightIcon && <RightIcon />}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyle, variantStyle, className)}
      disabled={isDisabled}
      {...(props as ButtonProps)}
    >
      {Icon && <Icon />}
      {children}
      {RightIcon && <RightIcon />}
      {loading && <Loader />}
    </button>
  );
};

export default Button;
