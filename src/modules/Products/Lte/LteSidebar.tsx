import cn from "@/utils/cn";
import BuySide from "./BuySide";
import PlansSide from "./PlansSide";

const LteSidebar = () => {
  return (
    <div className={cn("bg-black-3 h-full grow px-8", "flex flex-col gap-8")}>
      <PlansSide />
      <BuySide />
    </div>
  );
};
export default LteSidebar;
