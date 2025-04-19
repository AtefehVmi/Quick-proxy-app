import Card from "@/components/Card/Card";
import ProductIcon from "public/icons/product-overview.svg";
import BritishFlag from "public/flags/british.svg";
import UKFlag from "public/flags/uk.svg";
import BelgiumFlag from "public/flags/belgium.svg";
import UsFlag from "public/flags/liberia.svg";
import JordanFlag from "public/flags/jordan.svg";
import FranceFlag from "public/flags/france.svg";
import TextSm from "@/components/Typography/TextSm";
import cn from "@/utils/cn";
import TextXs from "@/components/Typography/TextXs";

const locationItems = [
  { name: "British", flag: BritishFlag },
  { name: "United Kingdom", flag: UKFlag },
  { name: "Belgium", flag: BelgiumFlag },
  { name: "Liberia", flag: UsFlag },
  { name: "Jordan", flag: JordanFlag },
  { name: "France", flag: FranceFlag },
  { name: "Liberia", flag: UsFlag },
  { name: "United Kingdom", flag: UKFlag },
];

const Locations = ({
  className,
  heading = true,
}: {
  className?: string;
  heading?: boolean;
}) => {
  return (
    <Card className={cn("p-0", heading && "pt-4.5 pb-6", className)}>
      {heading && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ProductIcon />
            <p className="text-white text-lg font-bold">
              Most Popular Location
            </p>
          </div>

          <div className="flex items-center gap-1 mr-11">
            <TextSm className="text-white font-semibold">+120</TextSm>
            <TextXs className="text-grey-600">Country</TextXs>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div
          className={cn(
            "flex items-center gap-7.75 overflow-auto scrollbar-hide",
            heading ? "mt-8 justify-center px-6" : "justify-start py-8 px-6"
          )}
        >
          {locationItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.flag />
              <TextSm className="text-white whitespace-nowrap">
                {item.name}
              </TextSm>
            </div>
          ))}
        </div>
        {!heading && (
          <div className="flex items-center gap-1 mr-11">
            <TextSm className="text-white font-semibold">+120</TextSm>
            <TextXs className="text-grey-600">Country</TextXs>
          </div>
        )}
      </div>
    </Card>
  );
};
export default Locations;
