"use client";

import Card from "@/components/Card/Card";
import BalanceModal from "../Modals/BalanceModal";
import Loader from "@/components/Loader";
import { useUser } from "@/hooks/useUser";

const Balance = () => {
  const { balance, isLoading } = useUser();

  return (
    <Card className="py-4 px-4.5 bg-balance">
      <p className="text-lg text-grey-500 leading-9">Balance</p>
      <div className="flex items-center justify-between mt-9">
        <p className="text-grey-100 font-bold text-2xl 2xl:text-32">
          {isLoading ? (
            <Loader />
          ) : (
            `$${typeof balance === "number" ? balance.toFixed(2) : "0.00"}`
          )}
        </p>
        <BalanceModal variant="black" />
      </div>
    </Card>
  );
};

export default Balance;
