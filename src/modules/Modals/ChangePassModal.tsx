"use client";

import React, { useState } from "react";
import cn from "@/utils/cn";
import { Dialog, DialogPanel } from "@headlessui/react";
import CrossIcon from "public/icons/cross-small.svg";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import PasswordInput from "@/components/PasswordInput";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import { getUserDetails } from "@/services/customApi";

const ChangePassModal = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const { id } = useUser();

  const { data: accountDetails, isLoading } = useQuery({
    queryKey: QUERY_KEYS.USER_DETAILS,
    queryFn: () => getUserDetails(id!),
    staleTime: 1 * 60 * 1000,
  });

  const [pass, setPass] = useState(accountDetails?.password);

  const handleCloseButton = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="py-1 px-4 whitespace-nowrap"
        variant="black"
      >
        Change Password
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
                Change Password
              </p>
              <CrossIcon
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="mt-13.5 flex flex-col gap-8">
              <InputText
                placeholder="Enter"
                label="Username"
                value={accountDetails?.username ?? ""}
                readOnly
              />

              <PasswordInput
                showPassWeakness={false}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                label="Password"
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
              <Button>Save change</Button>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </div>
  );
};
export default ChangePassModal;
