import cn from "@/utils/cn";
import BuySide from "./BuySide";
import PlansSide from "./PlansSide";

const LteSidebar = ({
  selectedPlan,
  setSelectedPlan,
}: {
  selectedPlan: any;
  setSelectedPlan: (plan: any) => void;
}) => {
  return (
    <div className={cn("bg-black-3 h-full grow px-8", "flex flex-col gap-8")}>
      <PlansSide />
      <BuySide setSelectedPlan={setSelectedPlan} selectedPlan={selectedPlan} />
    </div>
  );
};
export default LteSidebar;
