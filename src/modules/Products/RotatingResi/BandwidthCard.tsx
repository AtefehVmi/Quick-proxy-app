"use client";

import TextSm from "@/components/Typography/TextSm";
import TextXs from "@/components/Typography/TextXs";
import { QUERY_KEYS } from "@/constants/keys";
import { useUser } from "@/hooks/useUser";
import BandwidthModal from "@/modules/Modals/BandwidthModal";
import { getUserDetails } from "@/services/customApi";
import { useQuery } from "@tanstack/react-query";

const BandwidthCard = () => {
  const { subuser } = useUser();

  const { data } = useQuery({
    queryKey: QUERY_KEYS.USER_DETAILS,
    queryFn: () => getUserDetails(subuser!),
    enabled: !!subuser,
  });

  console.log(data);

  return (
    <div className="mt-5 bg-bandwidth p-4.5 flex items-end justify-between">
      <div>
        <TextSm className="leading-6">Current Bandwidth</TextSm>
        <p className="text-2xl lg:text-32 font-bold">
          {data?.availableTraffic ?? 0} GB
        </p>

        <div className="flex items-center gap-2 mt-5">
          <TextXs className="text-black-border">Last purhcase at</TextXs>
          <TextSm className="font-semibold">22 may, 2025</TextSm>
        </div>
      </div>

      <BandwidthModal />
      {/* <SuccessPayment title="Add Bandwidth" type="bandwidth" /> */}
    </div>
  );
};
export default BandwidthCard;
