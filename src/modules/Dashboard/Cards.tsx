import { useUser } from "@/hooks/useUser";
import Balance from "./Balance";
import StatsCard from "./StatsCard";
import BgClockImage from "public/images/alarm-clock.png";
import BgCartImage from "public/images/cart-shopping-fast.png";
import BgCubeImage from "public/images/cube.png";
import Loader from "@/components/Loader";

const Cards = () => {
  const { total_orders, total_spending, isLoading } = useUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
      <StatsCard
        title="All Time Spending"
        data={isLoading ? <Loader /> : `$${total_spending?.toFixed(2)}`}
        bgImage={BgClockImage}
      />

      <StatsCard
        title="Total purchases"
        data={isLoading ? <Loader /> : `$${total_orders?.toFixed(2)}`}
        bgImage={BgCartImage}
      />

      <StatsCard title="Product" data={6} bgImage={BgCubeImage} />

      <Balance />
    </div>
  );
};

export default Cards;
