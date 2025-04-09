import GenerateCard from "@/modules/Products/RotatingResi/GenerateCard";
import GenerateSide from "@/modules/Products/RotatingResi/GenerateSide";
import ProxyGenerator from "@/modules/Products/RotatingResi/ProxyGenerator";
import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import RotatingResiIcon from "public/icons/rotating-resi.svg";

const RotatingGenerator = () => {
  return (
    <div className={cn("w-full", "grid grid-cols-24 gap-5")}>
      <div className="col-span-16 px-8 pt-6 pb-8">
        <Heading title="Rotating Residential" Icon={RotatingResiIcon} />
        <ProxyGenerator className="mt-6" />
        <GenerateCard className="mt-6" />
      </div>

      <div className="col-span-8">
        <GenerateSide />
      </div>
    </div>
  );
};
export default RotatingGenerator;
