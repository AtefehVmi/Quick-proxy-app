"use client";

import Loader from "@/components/Loader";
import TextSm from "@/components/Typography/TextSm";
import TextXs from "@/components/Typography/TextXs";
import { QUERY_KEYS } from "@/constants/keys";
import { useUser } from "@/hooks/useUser";
import BandwidthModal from "@/modules/Modals/BandwidthModal";
import SuccessPayment from "@/modules/Modals/SuccessPayment";
import { getUserDetails } from "@/services/customApi";
import { useQuery } from "@tanstack/react-query";

const BandwidthCard = () => {
  const { subuser } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.USER_DETAILS,
    queryFn: () => getUserDetails(subuser!),
    enabled: !!subuser,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  console.log(data);

  return (
    <div className="mt-5 bg-bandwidth p-4.5 flex items-end justify-between">
      <div>
        <TextSm className="leading-6">Current Bandwidth</TextSm>
        <p className="text-2xl lg:text-32 font-bold">
          {isLoading ? <Loader /> : `${data?.availableTraffic ?? 0} GB`}
        </p>

        <div className="flex items-center gap-2 mt-5">
          <TextXs className="text-black-border">Last purhcase at</TextXs>
          <TextSm className="font-semibold">
            {isLoading ? <Loader /> : formatDate(data?.created_at) ?? "-"}
          </TextSm>
        </div>
      </div>

      <BandwidthModal />
      {/* <SuccessPayment title="Add Bandwidth" type="bandwidth" /> */}
    </div>
  );
};
export default BandwidthCard;
