import ProxyCard from "@/modules/Products/RotatingResi/ProxyCard";
import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import RotatingResiIcon from "public/icons/rotating-resi.svg";

const RotatingResidential = () => {
  return (
    <div className={cn("w-full", "grid grid-cols-24 gap-5")}>
      <div className="col-span-16 px-8 pt-6 pb-8">
        <Heading title="Rotating Residential" Icon={RotatingResiIcon} />
        <ProxyCard className="mt-6" />
      </div>
    </div>
  );
};
export default RotatingResidential;
