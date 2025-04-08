"use client";

import React, { useState } from "react";
import cn from "@/utils/cn";
import { Dialog, DialogPanel } from "@headlessui/react";
import CrossIcon from "public/icons/cross-small.svg";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import AddIcon from "public/icons/add.svg";
import Autocomplete from "@/components/Autocomplete";

const paymentOptions = [
  { label: "Credit Cart", value: "1" },
  { label: "Crypto currency", value: "2" },
];

const BalanceModal = ({
  className,
  variant,
}: {
  className?: string;
  variant: "primary" | "outlined" | "black";
}) => {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState("");

  const handleCloseButton = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant={variant}
        onClick={() => setOpen(true)}
        className={cn("p-3.5 h-fit w-fit", className)}
      >
        <AddIcon />
      </Button>

      {open && (
        <Dialog
          open={open}
          onClose={handleCloseButton}
          transition
          className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-modal-bg transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <DialogPanel as="form" className={cn("w-139", "bg-black-3 p-6")}>
            <div className="flex items-center justify-between pb-6 border-b border-black-border">
              <p className="text-2xl leading-9 font-bold text-white">
                Add Balance
              </p>
              <CrossIcon
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="mt-13.5 flex flex-col gap-8">
              <InputText
                placeholder="Enter"
                label="Amount"
                className="max-w-[508px] w-full"
              />

              <Autocomplete
                className="max-w-[508px] w-full"
                onChange={({ value }) => setPayment(value)}
                value={payment}
                options={paymentOptions}
                label="Payment method"
                variant="primary"
                placeholder="Select"
              />
            </div>

            <div
              className={cn(
                "mt-12 border-t border-black-border pt-6",
                "flex items-center justify-end *:py-4 *:px-12 gap-3 *:font-bold"
              )}
            >
              <Button onClick={handleCloseButton} variant="outlined">
                Cancel
              </Button>
              <Button>Top Up</Button>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </div>
  );
};
export default BalanceModal;
