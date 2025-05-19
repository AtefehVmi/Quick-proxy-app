"use client";

import React, { useState } from "react";
import cn from "@/utils/cn";
import { Dialog, DialogPanel } from "@headlessui/react";
import CrossIcon from "public/icons/cross-small.svg";
import CopyIcon from "public/icons/copy.svg";
import DownloadIcon from "public/icons/file-download.svg";
import Button from "@/components/Button";
import NoDataImage from "public/images/no-data.png";
import Image from "next/image";
import { toast } from "react-toastify";
import CopiedIcon from "public/icons/assept-document.svg";
import DownloadedIcon from "public/icons/file-download-small.svg";
import { LteRecent } from "@/constants/types";

interface GenerateProxyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  className?: string;
  data: any;
}

const GenerateProxyModal: React.FC<GenerateProxyModalProps> = ({
  className,
  open,
  setOpen,
  data,
}) => {
  console.log(data);
  const handleCloseButton = () => {
    setOpen(false);
  };

  const getTextData = () => {
    return typeof data === "string" ? data : JSON.stringify(data, null, 2);
  };

  const copyText = () => {
    const text = getTextData();
    navigator.clipboard.writeText(text);
    toast.success("Copied to your clipboard.", {
      icon: <CopiedIcon />,
    });
  };

  const downloadText = () => {
    const text = getTextData();
    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.txt";
    link.click();

    toast.success("Downloaded successfully.", {
      icon: <DownloadedIcon />,
    });
  };

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={handleCloseButton}
          transition
          className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-modal-bg transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <DialogPanel className={cn("max-w-139 lg:w-full", "bg-black-3 p-6")}>
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
              {data ? (
                typeof data === "string" ? (
                  data
                ) : (
                  JSON.stringify(data, null, 2)
                )
              ) : (
                <div className="flex items-center justify-center my-11">
                  <Image src={NoDataImage} alt="no data" quality={100} />
                </div>
              )}
            </div>

            <div className="mt-12 border-t border-black-border pt-6 flex items-center justify-end gap-3">
              <Button
                onClick={copyText}
                variant="outlined"
                className="py-4 px-12"
                Icon={CopyIcon}
              >
                Copy
              </Button>
              <Button
                onClick={downloadText}
                className="font-semibold px-12 py-4"
                Icon={DownloadIcon}
              >
                Download
              </Button>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </>
  );
};

export default GenerateProxyModal;
