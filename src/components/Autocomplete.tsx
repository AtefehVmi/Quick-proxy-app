"use client";

import { Ref, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
  Label,
} from "@headlessui/react";
import ArrowDownIcon from "public/icons/chevron-down.svg";
import Loader from "@/components/Loader";
import cn from "@/utils/cn";

type Option<A, B> = {
  label: string;
  value: A;
  icon?: React.ReactNode;
  extra?: B;
};

type CustomProps<A, B> = {
  ref?: Ref<HTMLInputElement>;
  searchable?: boolean;
  error?: boolean;
  success?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  variant: "primary" | "secondary";
  label?: string;
  description?: string;
  allocateSpaceForDescription?: boolean;
  options: Option<A, B>[];
  value: A;
  onChange: ({ value, option }: { value: A; option?: Option<A, B> }) => void;
  borderLess?: boolean;
};

export type AutocompleteProps<A, B> = CustomProps<A, B> &
  Omit<React.ComponentPropsWithoutRef<"input">, keyof CustomProps<A, B>>;

const Autocomplete = <A extends string | number | null, B extends any>(
  props: AutocompleteProps<A, B>
) => {
  const {
    className,
    fullWidth,
    searchable = true,
    error,
    success,
    loading,
    startAdornment: startAdornmentProp,
    variant = "primary",
    label,
    description,
    allocateSpaceForDescription = false,
    options,
    value,
    onChange,
    onFocus,
    onBlur,
    borderLess = false,
    ...rest
  } = props;

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);

  const handleFocusChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus?.(event);
  };

  const handleBlurChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur?.(event);
  };

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const selectedOption = filteredOptions.find(
    (option) => option.value === value
  );

  const startAdornment = startAdornmentProp || selectedOption?.icon;

  const classes = {
    root: cn(
      "w-[22.75rem] flex flex-col gap-2",
      fullWidth && "w-full",
      className
    ),
    label: cn(
      "absolute -top-2.5 left-3 px-1 text-sm pointer-events-none z-10",
      "bg-black-3",
      focus ? "text-primary-400" : "text-grey"
    ),
    description: cn(
      "text-sm font-normal",
      error && "text-grey-250",
      description ? "visible" : "invisible"
    ),
    inputWrapper: cn(
      `relative flex justify-center items-center border border-solid
       border-[#EAEAEA]/15 focus-within:border-primary-400 p-3 py-7`
    ),
    input: cn(
      "w-full h-full absolute text-xs focus:outline-none bg-transparent text-white placeholder:text-white pt-2 pb-2 px-4",
      startAdornment && "pl-11",
      !searchable && "cursor-default caret-transparent"
    ),
  };

  return (
    <Field className={classes.root}>
      <div className="relative">
        {label && <Label className={classes.label}>{label}</Label>}
        <Combobox
          by="label"
          immediate
          value={selectedOption ?? null}
          onChange={(option) =>
            onChange({
              // @ts-expect-error unknown
              value: option?.value ?? null,
              option: option ?? undefined,
            })
          }
          onClose={() => setQuery("")}
          virtual={{ options: filteredOptions }}
        >
          <div className={classes.inputWrapper}>
            {startAdornment && (
              <span className="absolute left-3 text-grey-300 z-20">
                {startAdornment}
              </span>
            )}
            <ComboboxInput
              readOnly={!searchable}
              autoComplete="off"
              aria-label="Assignee"
              className={classes.input}
              // @ts-expect-error unknown
              displayValue={(option) => option?.label}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={handleFocusChange}
              onBlur={handleBlurChange}
              {...rest}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              {loading ? (
                <Loader />
              ) : (
                <ArrowDownIcon className="transition-transform duration-300 text-grey-150 group-data-[open]:text-white group-data-[open]:rotate-180" />
              )}
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom"
            transition
            className={cn(
              "border border-solid border-[#343434] bg-black-3",
              "z-40 w-[var(--input-width)] text-sm font-normal [--anchor-gap:0.1rem] empty:invisible",
              "origin-top transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0"
            )}
          >
            {({ option }) => (
              <ComboboxOption
                value={option}
                className="flex gap-2 justify-start items-center px-2 py-4 w-full cursor-pointer hover:bg-black"
              >
                {option.icon && option.icon}
                {option.label}
              </ComboboxOption>
            )}
          </ComboboxOptions>
        </Combobox>
      </div>

      {(allocateSpaceForDescription || description) && (
        <Description className={classes.description}>
          {description ? description : "allocateSpaceForDescription"}
        </Description>
      )}
    </Field>
  );
};

export default Autocomplete;
