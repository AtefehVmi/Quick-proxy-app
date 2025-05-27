"use client";

import React from "react";
import cn from "@/utils/cn";
import { Dialog, DialogPanel } from "@headlessui/react";
import CrossIcon from "public/icons/cross-small.svg";
import SuccessImage from "public/images/success-payment.png";
import Image from "next/image";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";

type Props = {
  className?: string;
  open: boolean;
  onClose: () => void;
  title: string;
  type: "bandwidth" | "plan" | "balance";
  paymentMethod?: "Credit cart" | "Crypto";
};

const SuccessPayment: React.FC<Props> = ({
  className,
  open,
  onClose,
  title,
  type,
  paymentMethod = "Credit cart",
}) => {
  const { balance } = useUser();

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      transition
      className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-modal-bg transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel
        as="form"
        className={cn("max-w-139 lg:w-full", "bg-black-3 p-6", className)}
      >
        <div className="flex items-center justify-between pb-6 border-b border-black-border">
          <p className="text-2xl leading-9 font-bold text-white">{title}</p>
          <CrossIcon className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="mt-13.5 flex items-center justify-center">
          <Image src={SuccessImage} alt="Success" quality={100} />
        </div>

        <div
          className={cn(
            "mt-12 flex items-center gap-4 *:p-4 *:bg-black-2",
            "text-base text-grey-600 leading-6"
          )}
        >
          <p className="flex items-center gap-1">
            Available Balance:
            <span className="text-white font-bold text-2xl leading-9">
              ${balance}
            </span>
          </p>
          <p className="flex items-center gap-1">
            Payment:
            <span className="text-white font-bold text-2xl leading-9">
              {paymentMethod}
            </span>
          </p>
        </div>

        <div className="mt-12 border-t border-black-border pt-6 flex items-center justify-end">
          <Button onClick={onClose} className="font-semibold px-12 py-4">
            Ok
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default SuccessPayment;
