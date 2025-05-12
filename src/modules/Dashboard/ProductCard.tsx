import Card from "@/components/Card/Card";
import ProductImage from "public/icons/product-card.svg";
import RotatingResiIcon from "public/icons/map-home.svg";
import RotatingDataIcon from "public/icons/database.svg";
import StaticResiIcon from "public/icons/location.svg";
import StaticDataIcon from "public/icons/network.svg";
import MobileIcon from "public/icons/mobile.svg";
import ArrowIcon from "public/icons/arrow-small-right.svg";
import Link from "next/link";
import cn from "@/utils/cn";

const products = [
  {
    product: "Rotating Residential",
    icon: RotatingResiIcon,
    href: "products/rotating-residential",
  },
  // {
  //   product: "Rotating Datacenter",
  //   icon: RotatingDataIcon,
  //   href: "products/rotating-datacenter",
  // },
  {
    product: "Static Residential",
    icon: StaticResiIcon,
    href: "products/isp",
  },
  // {
  //   product: "Static Datacenter",
  //   icon: StaticDataIcon,
  //   href: "products/static-datacenter",
  // },
  { product: "Rotating Mobile", icon: MobileIcon, href: "" },
  { product: "Static Mobile", icon: MobileIcon, href: "products/lte" },
];

const ProductCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("px-0", className)}>
      <div className="flex items-center gap-2">
        <ProductImage />
        <p className="text-white text-lg font-bold">Products</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 mx-6">
        {products.map((product, index) => (
          <Link
            href={product.href}
            key={index}
            className={cn(
              "flex justify-between items-center py-1 cursor-pointer",
              "hover:text-primary-400 text-white"
            )}
          >
            <div className="flex gap-3 items-center">
              <product.icon />
              <p className="text-base leading-6">{product.product}</p>
            </div>
            <ArrowIcon />
          </Link>
        ))}
      </div>
    </Card>
  );
};
export default ProductCard;
