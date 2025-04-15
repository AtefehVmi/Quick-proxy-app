import Button from "@/components/Button";
import TextSm from "@/components/Typography/TextSm";
import { toast } from "react-toastify";
import DownloadedIcon from "public/icons/file-download-small.svg";
import CopyIcon from "public/icons/copy.svg";
import DownloadIcon from "public/icons/file-download.svg";
import CopiedIcon from "public/icons/assept-document.svg";
import Image from "next/image";
import NoDataImage from "public/images/no-data.png";

const GeneratedProxy = ({ data }: { data: string }) => {
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
    <div className="flex flex-col h-full">
      <div className="grow">
        <p className="text-white font-bold text-xl leading-7.5 pt-6">
          Generated Proxies
        </p>
        {data.length > 0 ? (
          <TextSm className="mt-6 text-white whitespace-pre-line max-h-[522px] h-full overflow-auto scrollbar-hide">
            {data}
          </TextSm>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image src={NoDataImage} alt="no data" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pb-8">
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
  );
};
export default GeneratedProxy;
