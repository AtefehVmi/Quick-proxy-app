import Card from "@/components/Card/Card";
import WalletIcon from "public/icons/wallet.svg";
import BalanceModal from "@/modules/Modals/BalanceModal";
import cn from "@/utils/cn";

const BalanceCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("flex items-end justify-between", className)}>
      <div>
        <div className="flex gap-2 items-center">
          <WalletIcon />
          <p className="text-xs leading-4.5 text-grey-500">Balance</p>
        </div>

        <p className="mt-2 font-bold text-lg leading-6 text-grey-100">
          $456.00
        </p>
      </div>

      <BalanceModal variant="primary" />
    </Card>
  );
};
export default BalanceCard;
