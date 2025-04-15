"use client";

import cn from "@/utils/cn";
import ActivePlansCard from "./ActivePlansCard";
import TextSm from "@/components/Typography/TextSm";
import CopyIcon from "public/icons/copy.svg";
import DownloadIcon from "public/icons/file-download.svg";
import Button from "@/components/Button";
import CopiedIcon from "public/icons/assept-document.svg";
import { toast } from "react-toastify";
import DownloadedIcon from "public/icons/file-download-small.svg";

const ActivitySidebar = () => {
  const data = `username = "customer-USER"
password = "PASS"
proxy = "core.proxy.io:7777"

proxies = {
  'http': f'http://{username}:{password}@{proxy}',
  'https': f'http://{username}:{password}@{proxy}'
}
  
username = "customer-USER"
password = "PASS"
proxy = "core.proxy.io:7777"

proxies = {
  'http': f'http://{username}:{password}@{proxy}',
  'https': f'http://{username}:{password}@{proxy}'
}
  
username = "customer-USER"
password = "PASS"
proxy = "core.proxy.io:7777"

proxies = {
  'http': f'http://{username}:{password}@{proxy}',
  'https': f'http://{username}:{password}@{proxy}'
}`;

  const copyText = () => {
    navigator.clipboard.writeText(data);
    toast.success("Copied to your clipboard.", {
      icon: <CopiedIcon />,
    });
  };

  const downloadText = () => {
    const blob = new Blob([data], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.txt";
    link.click();

    toast.success("Downloaded successfully.", {
      icon: <DownloadedIcon />,
    });
  };

  return (
    <div
      className={cn("bg-black-3 h-screen grow px-8", "flex flex-col gap-12")}
    >
      <div>
        <p className="text-white font-bold text-xl leading-7.5 py-6">Plans</p>
        <ActivePlansCard />
      </div>

      <div className="flex flex-col">
        <div className="grow">
          <p className="text-white font-bold text-xl leading-7.5 pt-6">
            Generated Proxies
          </p>
          <TextSm className="mt-6 text-white whitespace-pre-line max-h-[522px] h-full overflow-auto scrollbar-hide">
            {data}
          </TextSm>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={copyText}
            variant="ghost"
            Icon={CopyIcon}
            className="py-2 px-4"
          >
            Copy
          </Button>
          <Button
            onClick={downloadText}
            variant="ghost"
            Icon={DownloadIcon}
            className="py-2 px-4"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ActivitySidebar;
