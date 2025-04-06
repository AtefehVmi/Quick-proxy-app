import Button from "@/components/Button";
import Card from "@/components/Card/Card";
import WalletIcon from "public/icons/wallet.svg";
import AddIcon from "public/icons/add.svg";

const BalanceCard = () => {
  return (
    <Card className="flex items-end justify-between">
      <div>
        <div className="flex gap-2 items-center">
          <WalletIcon />
          <p className="text-xs leading-4.5 text-grey-500">Balance</p>
        </div>

        <p className="mt-2 font-bold text-lg leading-6 text-grey-100">
          $456.00
        </p>
      </div>

      <Button className="p-2.5 h-fit w-fit">
        <AddIcon />
      </Button>
    </Card>
  );
};
export default BalanceCard;
