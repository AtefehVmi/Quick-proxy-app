import Card from "@/components/Card/Card";
import ProductIcon from "public/icons/product-overview.svg";
import LineCharts from "../Charts/LineCharts";

const mockData = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 2100 },
  { day: "Wed", sales: 1800 },
  { day: "Thu", sales: 2600 },
  { day: "Fri", sales: 3200 },
  { day: "Sat", sales: 2800 },
  { day: "Sun", sales: 1500 },
];

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
        data={mockData}
      />
    </Card>
  );
};
export default ProductOverview;
