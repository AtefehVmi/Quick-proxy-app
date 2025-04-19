import Heading from "../../shared/Heading";
import DashboardIcon from "public/icons/dashboard-icon.svg";
import Products from "./Products";
import QuickBuy from "./QuickBuy";
import RightSidebar from "./RightSidebar";

const OnboardingDashboard = () => {
  return (
    <div className="grid grid-cols-24 gap-5">
      <div className="col-span-24 xl:col-span-16 px-8 pt-6 pb-8">
        <Heading title="Dashboard" Icon={DashboardIcon} />
        <Products className="mt-8" />
        <QuickBuy className="mt-8" />
      </div>

      <div className="col-span-24 xl:col-span-8">
        <RightSidebar />
      </div>
    </div>
  );
};
export default OnboardingDashboard;
