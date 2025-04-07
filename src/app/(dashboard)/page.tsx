import Balance from "@/modules/Dashboard/Balance";
import ProductCard from "@/modules/Dashboard/ProductCard";
import ProductOverview from "@/modules/Dashboard/ProductOverview";
import RecentActivities from "@/modules/Dashboard/RecentActivities";
import StatsCard from "@/modules/Dashboard/StatsCard";
import Heading from "@/modules/shared/Heading";
import DashboardIcon from "public/icons/dashboard-icon.svg";
import BgClockImage from "public/images/alarm-clock.png";
import BgCartImage from "public/images/cart-shopping.png";
import BgCubeImage from "public/images/cube.png";

const Dashboard = () => {
  return (
    <div className="w-full">
      <Heading title="Dashboard" Icon={DashboardIcon} />

      <div className="grid grid-cols-4 gap-5 mt-6">
        <StatsCard
          title="All Time Spending"
          data={234}
          bgImage={BgClockImage}
        />

        <StatsCard
          title="Total purchases"
          data={`$${(457).toFixed(2)}`}
          bgImage={BgCartImage}
        />

        <StatsCard title="Product" data={6} bgImage={BgCubeImage} />

        <Balance />
      </div>

      <div className="grid grid-cols-24 gap-5 mt-6">
        <div className="col-span-9">
          <ProductOverview />
        </div>
        <div className="col-span-9">
          <RecentActivities />
        </div>
        <div className="col-span-6">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
