import Balance from "@/modules/Dashboard/Balance";
import ProductCard from "@/modules/Dashboard/ProductCard";
import ProductOverview from "@/modules/Dashboard/ProductOverview";
import ProxyUsage from "@/modules/Dashboard/ProxyUsage";
import RecentActivities from "@/modules/Dashboard/RecentActivities";
import StatsCard from "@/modules/Dashboard/StatsCard";
import Heading from "@/modules/shared/Heading";
import DashboardIcon from "public/icons/dashboard-icon.svg";
import BgClockImage from "public/images/alarm-clock.png";
import BgCartImage from "public/images/cart-shopping.png";
import BgCubeImage from "public/images/cube.png";

const MainDashboard = () => {
  return (
    <div className="w-full px-8 pt-6 pb-8">
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
        <div className="col-span-16 2xl:col-span-18 flex flex-col 2xl:flex-row gap-5 w-full">
          <div className="w-full 2xl:w-1/2">
            <ProductOverview />
          </div>
          <div className="w-full 2xl:w-1/2">
            <RecentActivities />
          </div>
        </div>
        <div className="col-span-8 2xl:col-span-6">
          <ProductCard />
          <ProxyUsage className="mt-5" />
        </div>
      </div>
    </div>
  );
};
export default MainDashboard;
