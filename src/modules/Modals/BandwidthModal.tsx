"use client";

import React, { useState } from "react";
import cn from "@/utils/cn";
import { Dialog, DialogPanel } from "@headlessui/react";
import CrossIcon from "public/icons/cross-small.svg";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import AddIcon from "public/icons/add.svg";
import Autocomplete from "@/components/Autocomplete";
import useFetch from "@/hooks/useFetch";
import { CreateOrder } from "@/services/customApi";
import { toast } from "react-toastify";

const paymentOptions = [
  { label: "Credit Cart", value: "1" },
  { label: "Crypto currency", value: "2" },
];

const BandwidthModal = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState("");
  const [amount, setAmount] = useState(0);
  const { fetch: createOrderFetch } = useFetch(CreateOrder, false, {
    toastOnError: true,
  });

  const handleCloseButton = () => {
    setOpen(false);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = { type: "bandwidth", amount: amount, provider: "lemon" };
      await createOrderFetch(payload);
      toast.success("Redirecting...");
    } catch (error) {
      console.log("failed", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="black" className="p-3.5">
        <AddIcon />
      </Button>

      {open && (
        <Dialog
          open={open}
          onClose={handleCloseButton}
          transition
          className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-modal-bg transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <DialogPanel
            as="form"
            className={cn("max-w-139 lg:w-full", "bg-black-3 p-6")}
          >
            <div className="flex items-center justify-between pb-6 border-b border-black-border">
              <p className="text-lg lg:text-2xl leading-9 font-bold text-white">
                Add Bandwidth
              </p>
              <CrossIcon
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="mt-13.5 flex flex-col gap-8">
              <InputText
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter Amount"
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
                placeholder="Select Payment"
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
              <Button onClick={onSubmit}>Top Up</Button>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </div>
  );
};
export default BandwidthModal;
