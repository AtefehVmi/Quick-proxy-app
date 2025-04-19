import cn from "@/utils/cn";
import PlanTabs from "./PlanTabs";

const QuickBuy = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <p className="text-xl lg:text-2xl font-bold text-white">Quick Buy</p>

      <div className="mt-8">
        <PlanTabs />
      </div>
    </div>
  );
};
export default QuickBuy;
