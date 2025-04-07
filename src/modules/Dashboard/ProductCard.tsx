import Card from "@/components/Card/Card";
import ProductImage from "public/icons/product-card.svg";
import RotatingResiIcon from "public/icons/map-home.svg";
import RotatingDataIcon from "public/icons/database.svg";
import StaticResiIcon from "public/icons/location.svg";
import StaticDataIcon from "public/icons/network.svg";
import MobileIcon from "public/icons/mobile.svg";
import ArrowIcon from "public/icons/arrow-small-right.svg";
import Link from "next/link";

const products = [
  { product: "Rotating Residential Proxies", icon: RotatingResiIcon, href: "" },
  { product: "Rotating Datacenter Proxies", icon: RotatingDataIcon, href: "" },
  { product: "Static Residential Proxies", icon: StaticResiIcon, href: "" },
  { product: "Static Datacenter Proxies", icon: StaticDataIcon, href: "" },
  { product: "Rotating Mobile Proxies", icon: MobileIcon, href: "" },
  { product: "Static Mobile Proxies", icon: MobileIcon, href: "" },
];

const ProductCard = () => {
  return (
    <Card className="px-0">
      <div className="flex items-center gap-2">
        <ProductImage />
        <p className="text-white text-lg font-bold">Product</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 mx-6">
        {products.map((product, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <div className="flex gap-3 items-center">
              <product.icon />
              <p className="text-white text-base leading-6">
                {product.product}
              </p>
            </div>
            <Link href={product.href}>
              <ArrowIcon className="cursor-pointer" />
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default ProductCard;
