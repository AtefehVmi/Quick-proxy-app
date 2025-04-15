import TextSm from "@/components/Typography/TextSm";
import TextXs from "@/components/Typography/TextXs";
import SuccessPayment from "@/modules/Modals/SuccessPayment";

const ActivePlansCard = () => {
  return (
    <div className="bg-bandwidth p-4.5 flex items-end justify-between">
      <div>
        <TextSm className="leading-6">Active Plans</TextSm>
        <p className="text-32 font-bold">12 Plans</p>

        <div className="flex items-center gap-2 mt-5">
          <TextXs className="text-black-border">Last purhcase at</TextXs>
          <TextSm className="font-semibold">22 may, 2025</TextSm>
        </div>
      </div>

      <SuccessPayment title="Get Plan" type="plan" />
    </div>
  );
};
export default ActivePlansCard;
