"use client";

import React, { useState } from "react";
import cn from "@/utils/cn";
import { Dialog, DialogPanel } from "@headlessui/react";
import CrossIcon from "public/icons/cross-small.svg";
import CopyIcon from "public/icons/copy.svg";
import DownloadIcon from "public/icons/file-download.svg";
import Button from "@/components/Button";
import MagicwandIcon from "public/icons/magic-wand.svg";

const GenerateProxyModal = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);

  const handleCloseButton = () => {
    setOpen(false);
  };

  const data = `username = "customer-USER"
password = "PASS"
proxy = "core.proxy.io:7777"

proxies = {
  'http': f'http://{username}:{password}@{proxy}',
  'https': f'http://{username}:{password}@{proxy}'
}`;

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        Icon={MagicwandIcon}
        className="py-3 px-10 font-semibold"
      >
        Generate proxy
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
                Generate
              </p>
              <CrossIcon
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="bg-black-2 p-5 mt-13.5 whitespace-pre-line h-78 overflow-y-auto">
              {data ?? ""}
            </div>

            <div className="mt-12 border-t border-black-border pt-6 flex items-center justify-end gap-3">
              <Button variant="outlined" className="py-4 px-12" Icon={CopyIcon}>
                Copy
              </Button>
              <Button className="font-semibold px-12 py-4" Icon={DownloadIcon}>
                Download
              </Button>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </div>
  );
};
export default GenerateProxyModal;
