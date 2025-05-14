"use client";

import React, { Ref, useRef, useState } from "react";
import { Field, Input, Description, Label } from "@headlessui/react";
import cn from "@/utils/cn";

type CustomProps = {
  ref?: Ref<HTMLInputElement>;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  label?: string;
  description?: string | React.ReactNode;
  allocateSpaceForDescription?: boolean;
  paddingY?: string;
  labelBg?: string;
};

export type InputTextProps = CustomProps &
  Omit<React.ComponentPropsWithoutRef<"input">, keyof CustomProps>;

const InputText = (props: InputTextProps) => {
  const {
    className,
    labelBg,
    disabled,
    fullWidth,
    error,
    success,
    label,
    description,
    startAdornment,
    endAdornment,
    allocateSpaceForDescription = false,
    onFocus,
    onBlur,
    paddingY = "py-7",
    type,
    ...rest
  } = props;

  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus?.(event);
  };

  const handleBlurChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur?.(event);
  };

  const handleCalendarClick = () => {
    if (type === "date" && inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  const classes = {
    root: cn("flex flex-col gap-2", fullWidth && "w-full", className),
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
      "pt-2 pb-2 px-4 w-full h-full absolute text-xs focus:outline-none bg-transparent text-white placeholder:text-white/75",
      startAdornment && "pl-11",
      endAdornment && "pr-9"
    ),
    startAdornment: "absolute left-3 text-grey-300 z-20",
    endAdornment: "absolute right-2",
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
            type={type}
            className={classes.input}
            disabled={disabled}
            onFocus={handleFocusChange}
            onBlur={handleBlurChange}
            {...rest}
          />

          <span className={classes.endAdornment}>
            {endAdornment && endAdornment}
          </span>
        </div>
      </div>

      {(allocateSpaceForDescription || description) && (
        <Description className={classes.description}>
          {description ? description : "allocateSpaceForDescription"}
        </Description>
      )}

      <style jsx global>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none !important;
        }
      `}</style>
    </Field>
  );
};

export default InputText;
