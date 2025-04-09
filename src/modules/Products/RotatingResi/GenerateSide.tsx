import cn from "@/utils/cn";
import Bandwidth from "./Bandwidth";
import PurhcaseHistroy from "./PurchaseHistory";

const GenerateSide = () => {
  return (
    <div
      className={cn(
        "bg-black-3 h-[calc(100vh_-_100px)] grow px-8",
        "flex flex-col gap-10"
      )}
    >
      <Bandwidth />

      <PurhcaseHistroy />
    </div>
  );
};
export default GenerateSide;
