import TextSm from "@/components/Typography/TextSm";
import TextXs from "@/components/Typography/TextXs";
import BalanceModal from "@/modules/Modals/BalanceModal";
import cn from "@/utils/cn";

const Wallet = ({
  className,
  title,
}: {
  className?: string;
  title: string;
}) => {
  return (
    <div className={cn(className)}>
      <p className="text-xl lg:text-2xl leading-9 text-white font-bold">
        {title}
      </p>

      <div className="mt-6 pb-6 bg-wallet flex items-end justify-between">
        <div>
          <div className="pl-4.5 pt-4.5">
            <TextSm className="text-grey-500">Available Balance</TextSm>
            <p className="text-2xl leading-9 text-white font-bold">$00.00</p>
          </div>

          <div className="mt-4 pl-4.5 flex items-center gap-19.25">
            <div>
              <TextXs className="text-grey-500">Transactions</TextXs>
              <p className="text-base leading-7 text-white font-semibold">
                $00.00
              </p>
            </div>
            <div>
              <TextXs className="text-grey-500">Wallets</TextXs>
              <p className="text-base leading-7 text-white font-semibold">
                $00.00
              </p>
            </div>
          </div>

          <div className="mt-4 pl-4.5 flex items-center gap-2">
            <TextXs className="text-white">Last Activity at</TextXs>
            <TextSm className="font-semibold text-white">-</TextSm>
          </div>
        </div>

        <BalanceModal variant="black" className="w-10 h-10 mr-6" />
      </div>
    </div>
  );
};
export default Wallet;
