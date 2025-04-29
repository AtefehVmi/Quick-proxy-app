import cn from "@/utils/cn";
import BuySide from "./BuySide";
import PlansSide from "./PlansSide";

const LteSidebar = ({ selectedPlan }: { selectedPlan: any }) => {
  return (
    <div className={cn("bg-black-3 h-full grow px-8", "flex flex-col gap-8")}>
      <PlansSide />
      <BuySide selectedPlan={selectedPlan} />
    </div>
  );
};
export default LteSidebar;
