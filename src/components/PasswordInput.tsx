"use client";

import React, { Ref, useState, useEffect, useRef, useMemo } from "react";
import { Field, Input, Description, Label } from "@headlessui/react";
import EyeIcon from "public/icons/eye-icon.svg";
import cn from "@/utils/cn";
import ClosedEyeIcon from "public/icons/closed-eye.svg";

type Strength = "Weak" | "Normal" | "Strong";

const getPasswordStrength = (
  password: string
): { score: number; label: Strength } => {
  let score = 0;

  if (password.length >= 1) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;

  let label: Strength = "Weak";
  if (score >= 4) label = "Strong";
  else if (score >= 2) label = "Normal";

  return { score, label };
};

type CustomProps = {
  ref?: Ref<HTMLInputElement>;
  error?: boolean;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  label?: string;
  description?: string | React.ReactNode;
  allocateSpaceForDescription?: boolean;
  labelAdorment?: React.ReactNode;
  paddingY?: "py-4" | "py-5" | "py-6";
  searchBar?: boolean;
  labelBg?: string;
  success?: boolean;
  value?: string;
};

export type InputTextProps = CustomProps &
  Omit<React.ComponentPropsWithoutRef<"input">, keyof CustomProps>;

const PasswordInput = (props: InputTextProps) => {
  const {
    className,
    disabled,
    fullWidth,
    error,
    label,
    description,
    startAdornment,
    endAdornment,
    labelAdorment,
    success,
    allocateSpaceForDescription = false,
    onFocus,
    onBlur,
    paddingY = "py-7",
    searchBar = false,
    labelBg,
    value = "",
    ...rest
  } = props;

  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const strength = useMemo(() => getPasswordStrength(value), [value]);

  const onToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleFocusChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus?.(event);
  };

  const handleBlurChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur?.(event);
  };

  const classes = {
    root: cn(
      "flex flex-col gap-2 placeholder:text-white",
      fullWidth && "w-full",
      className
    ),
    label: cn(
      "absolute -top-2.5 left-3 px-1 text-sm pointer-events-none z-10",
      focus ? "text-primary-400" : "text-grey",
      error && "text-danger",
      success && "text-success",
      labelBg ? labelBg : "bg-black-3",
      disabled && "bg-transparent"
    ),
    description: cn(
      "text-sm font-normal",
      error && "text-danger",
      success && "text-success",
      description ? "visible" : "invisible"
    ),
    inputWrapper: cn(
      `relative flex justify-center items-center border border-solid p-3
       border-[#EAEAEA]/15 focus-within:border-primary-400 ${paddingY}`,
      error && "focus-within:border-danger",
      success && "focus-within:border-success",
      disabled && "bg-[#FEFEFE]/5"
    ),
    input: cn(
      "pt-2 pb-2 px-4 w-full h-full absolute text-xs focus:outline-none bg-transparent text-white placeholder:text-white",
      startAdornment && "pl-11",
      endAdornment && "pr-9"
    ),
    startAdornment: cn("absolute left-3 text-grey-300 z-20"),
    endAdornment: cn("absolute right-2"),
  };

  return (
    <Field className={classes.root}>
      <div className="relative">
        {label && <Label className={classes.label}>{label}</Label>}
        <div className={classes.inputWrapper}>
          <span className={classes.startAdornment}>
            {startAdornment && startAdornment}
          </span>

          <Input
            ref={inputRef}
            type={isOpen ? "text" : "password"}
            className={classes.input}
            value={value}
            disabled={disabled}
            onFocus={handleFocusChange}
            onBlur={handleBlurChange}
            {...rest}
          />

          <span className={classes.endAdornment}>
            <span className="select-none">
              {isOpen ? (
                <EyeIcon className="cursor-pointer" onClick={onToggle} />
              ) : (
                <ClosedEyeIcon className="cursor-pointer" onClick={onToggle} />
              )}
            </span>
            {endAdornment && endAdornment}
          </span>
        </div>
      </div>
      {(allocateSpaceForDescription || description) && (
        <Description className={classes.description}>
          {description ? description : "allocateSpaceForDescription"}
        </Description>
      )}

      {value.length > 0 && (
        <div className="mt-6">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 flex-1",
                  index < strength.score
                    ? strength.label === "Weak"
                      ? "bg-danger"
                      : strength.label === "Normal"
                      ? "bg-warning"
                      : "bg-success"
                    : "bg-black-3"
                )}
              />
            ))}
          </div>
          <p className="text-xs leading-4.5 mt-2 text-grey-600">
            Password Strength :{" "}
            <span className="text-primary-400">{strength.label}</span>
          </p>
        </div>
      )}
    </Field>
  );
};

export default PasswordInput;
