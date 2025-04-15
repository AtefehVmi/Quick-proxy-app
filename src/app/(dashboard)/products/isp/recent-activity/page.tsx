import ActivitySidebar from "@/modules/Products/Isp/ActivitySidebar";
import ActivityTable from "@/modules/Products/Isp/ActivityTable";
import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import IspIcon from "public/icons/isp.svg";

const RecentActivity = () => {
  return (
    <div className={cn("w-full", "grid grid-cols-24 gap-5")}>
      <div className="col-span-16 px-8 pt-6 pb-8">
        <Heading title="ISP Proxies (Static residential)" Icon={IspIcon} />
        <ActivityTable className="mt-6" />
      </div>

      <div className="col-span-8">
        <ActivitySidebar />
      </div>
    </div>
  );
};
export default RecentActivity;
