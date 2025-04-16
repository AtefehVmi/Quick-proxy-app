import cn from "@/utils/cn";
import BuySide from "./BuySide";
import PlansSide from "./PlansSide";
import { LteRecent } from "@/constants/types";

const LteSidebar = ({ selectedRow }: { selectedRow: LteRecent | null }) => {
  return (
    <div className={cn("bg-black-3 h-full grow px-8", "flex flex-col gap-8")}>
      <PlansSide data={selectedRow} />
      <BuySide />
    </div>
  );
};
export default LteSidebar;
