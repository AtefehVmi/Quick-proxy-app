import Card from "@/components/Card/Card";
import ProductIcon from "public/icons/product-overview.svg";
import LineCharts from "../Charts/LineCharts";
import Filter from "@/components/Filter";

const ProductOverview = () => {
  return (
    <Card className="px-0 pt-4.5">
      <div className="flex items-center gap-2">
        <ProductIcon />
        <p className="text-white text-lg font-bold">Product Overview</p>
      </div>

      <LineCharts
        dataKey={"sales"}
        XdataKey={"day"}
        className="mt-14"
        data={[]}
      />

      <div className="mt-4.5">
        <Filter filterItems={["1 d", "1 w", "1 m", "1 y", "all"]} />
      </div>
    </Card>
  );
};
export default ProductOverview;
