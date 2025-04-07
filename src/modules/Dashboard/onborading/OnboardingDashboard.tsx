import Heading from "../../shared/Heading";
import DashboardIcon from "public/icons/dashboard-icon.svg";
import Products from "./Products";
import QuickBuy from "./QuickBuy";

const OnboardingDashboard = () => {
  return (
    <div className="grid grid-cols-24">
      <div className="col-span-16">
        <Heading title="Dashboard" Icon={DashboardIcon} />
        <Products className="mt-8" />
        <QuickBuy className="mt-8" />
      </div>

      <div className="col-span-8"></div>
    </div>
  );
};
export default OnboardingDashboard;
