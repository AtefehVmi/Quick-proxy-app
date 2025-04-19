"use client";

import React, { useState } from "react";
import cn from "@/utils/cn";
import { Dialog, DialogPanel } from "@headlessui/react";
import CrossIcon from "public/icons/cross-small.svg";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import EditIcon from "public/icons/file-edit.svg";

const ChangePassModal = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const [pass, setPass] = useState("********");

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
          <DialogPanel as="form" className={cn("w-139", "bg-black-3 p-6")}>
            <div className="flex items-center justify-between pb-6 border-b border-black-border">
              <p className="text-2xl leading-9 font-bold text-white">
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
                value={"Ali1234@#"}
                readOnly
                disabled
                className="max-w-[508px] w-full"
              />

              <InputText
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                label="Password"
                className="max-w-[508px] w-full"
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
