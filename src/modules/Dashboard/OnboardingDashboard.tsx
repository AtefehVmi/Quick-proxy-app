import Heading from "../shared/Heading";
import DashboardIcon from "public/icons/dashboard-icon.svg";

const OnboardingDashboard = () => {
  return (
    <div className="grid grid-cols-24">
      <div className="col-span-16">
        <Heading title="Dashboard" Icon={DashboardIcon} />
      </div>

      <div className="col-span-8"></div>
    </div>
  );
};
export default OnboardingDashboard;
