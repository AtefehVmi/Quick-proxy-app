import Button from "@/components/Button";
import Card from "@/components/Card/Card";
import cn from "@/utils/cn";
import GeneratorIcon from "public/icons/generator.svg";
import CopyIcon from "public/icons/copy.svg";
import DownloadIcon from "public/icons/file-download.svg";
import NoDataImage from "public/images/no-data.png";
import Image from "next/image";

const GenerateCard = ({ className }: { className?: string }) => {
  const data = ``;

  return (
    <Card className={cn("px-0 pt-4.5", className)}>
      <div className="flex items-center gap-2">
        <GeneratorIcon />
        <p className="text-white text-lg font-bold">Generate</p>
      </div>

      <div
        className={cn(
          "mt-8 bg-black-2 mx-6 mb-6 p-5",
          "text-white whitespace-pre-line"
        )}
      >
        {data ? (
          data
        ) : (
          <div className="flex items-center justify-center py-17.5">
            <Image src={NoDataImage} alt="" quality={100} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 *:py-2 *:px-4 px-6">
        <Button Icon={CopyIcon} variant="ghost">
          Copy
        </Button>
        <Button Icon={DownloadIcon} variant="ghost">
          Download
        </Button>
      </div>
    </Card>
  );
};
export default GenerateCard;
