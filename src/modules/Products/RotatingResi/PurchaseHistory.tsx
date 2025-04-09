import Button from "@/components/Button";
import TextBase from "@/components/Typography/TextBase";
import TextSm from "@/components/Typography/TextSm";
import PurchaseIcon from "public/icons/purchase.svg";
import CaretRightIcon from "public/icons/arrow-right.svg";
import cn from "@/utils/cn";
import NoPurchaseImage from "public/images/no-purchase.png";
import Image from "next/image";
import ArrowRightIcon from "public/icons/arrow-small-right.svg";

type PurchaseItem = {
  gb: number;
  status: "Active" | "Finished";
  date: string;
  price: number;
};

type GroupedPurchaseItems = {
  date: string;
  items: PurchaseItem[];
};

const purchaseItems: GroupedPurchaseItems[] = [
  //   {
  //     date: "Today",
  //     items: [
  //       { gb: 54, status: "Active", date: "12 may, 2025", price: 654 },
  //       { gb: 54, status: "Finished", date: "12 may, 2025", price: 654 },
  //     ],
  //   },
  //   {
  //     date: "Yesterday",
  //     items: [
  //       { gb: 54, status: "Active", date: "12 may, 2025", price: 654 },
  //       { gb: 54, status: "Finished", date: "12 may, 2025", price: 654 },
  //       { gb: 54, status: "Finished", date: "12 may, 2025", price: 654 },
  //     ],
  //   },
];

const PurhcaseHistroy = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl leading-7.7 font-bold text-white">
          Purchase History
        </p>
        <Button variant="black" className="py-1 px-4">
          View All
        </Button>
      </div>

      <div className="mt-5 flex flex-col gap-3.5 pb-8">
        {purchaseItems.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="mt-28">
              <Image src={NoPurchaseImage} alt="" quality={100} />

              <div className="mt-8">
                <Button className="py-3 px-10">
                  Get Started <ArrowRightIcon />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          purchaseItems.map((item, index) => (
            <div key={index}>
              <TextSm className="text-grey-600">{item.date}</TextSm>
              <div className="mt-2 flex flex-col gap-2">
                {item.items.map((purchase, index) => (
                  <div
                    className="bg-black p-3 flex items-center justify-between"
                    key={index}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="bg-black-2">
                        <PurchaseIcon className="m-2.75" />
                      </div>

                      <div>
                        <TextBase className="text-white font-semibold">
                          {purchase.gb} GB
                        </TextBase>

                        <div className="flex items-center gap-1">
                          <div
                            className={cn(
                              "flex items-center gap-1",
                              purchase.status === "Active" && "text-success",
                              purchase.status === "Finished" && "text-danger"
                            )}
                          >
                            <CaretRightIcon />
                            <TextSm>{purchase.status}</TextSm>
                          </div>

                          <TextSm className="text-grey-700">
                            / {purchase.date}
                          </TextSm>
                        </div>
                      </div>
                    </div>

                    <p className="text-white font-bold text-lg leading-8">
                      ${purchase.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default PurhcaseHistroy;
