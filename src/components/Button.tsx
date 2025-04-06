import Link, { LinkProps } from "next/link";
import React from "react";
import Loader from "./Loader/Loader";
import { UrlObject } from "url";
import cn from "@/utils/cn";

type Url = string | UrlObject;

type CustomProps = {
  variant?: "primary" | "outlined" | "primaryBig" | "secondary" | "none";
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
    "flex items-center justify-center gap-2.5 text-center px-2 text-sm leading-4 font-medium disabled:cursor-default";

  const variantStyle = cn(
    variant === "primary" &&
      "bg-deepBlue text-white py-1.5 hover:opacity-80 disabled:opacity-80 shadow-button",
    variant === "outlined" &&
      "bg-white py-2.5 hover:bg-gray-100 border border-borderGrey3 shadow-outlined-button",
    variant === "primaryBig" &&
      "bg-deepBlue text-white py-2.5 hover:opacity-80 disabled:opacity-80 shadow-button px-5",
    variant === "secondary" &&
      "px-6 py-2 shadow-outlined-button bg-secondary text-sm font-medium text-grey6 hover:opacity-80"
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
