import cn from "@/utils/cn";
import ActivePlansCard from "./ActivePlansCard";

const ActivitySidebar = () => {
  return (
    <div
      className={cn(
        "bg-black-3 h-screen grow px-8",
        "flex flex-col justify-between"
      )}
    >
      <div>
        <p className="text-white font-bold text-xl leading-7.5 py-6">Plans</p>
        <ActivePlansCard />
      </div>
    </div>
  );
};
export default ActivitySidebar;
