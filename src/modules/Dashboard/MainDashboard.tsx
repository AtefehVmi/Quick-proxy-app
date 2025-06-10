import ProductCard from "@/modules/Dashboard/ProductCard";
import ProductOverview from "@/modules/Dashboard/ProductOverview";
import ProxyUsage from "@/modules/Dashboard/ProxyUsage";
import Heading from "@/modules/shared/Heading";
import DashboardIcon from "public/icons/dashboard-icon.svg";

import Locations from "../Products/RotatingResi/Locations";
import BillingTable from "../Profile/BillingTable";
import Cards from "./Cards";

const MainDashboard = () => {
  return (
    <div className="w-full px-8 pt-6 pb-8">
      <Heading title="Dashboard" Icon={DashboardIcon} />
      <Cards />
      <div className="grid grid-cols-1 xl:grid-cols-24 gap-5 mt-6">
        <div className="col-span-1 lg:col-span-16 2xl:col-span-18 gap-5 w-full">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
            <div className="col-span-1">
              <ProductOverview />
            </div>
            <div className="col-span-1">
              <BillingTable
                showCoupon={false}
                tableHeight="max-h-[330px] min-h-[330px]"
                size="5"
              />
            </div>
          </div>
          <Locations className="mt-5" heading={false} />
        </div>

        <div className="col-span-1 lg:col-span-16 xl:col-span-8 2xl:col-span-6 w-full">
          <ProductCard className="w-full" />
          <ProxyUsage className="w-full mt-5" />
        </div>
      </div>
    </div>
  );
};
export default MainDashboard;
