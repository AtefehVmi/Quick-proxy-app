"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import WalletIcon from "public/icons/wallet.svg";
import BalanceModal from "@/modules/Modals/BalanceModal";
import cn from "@/utils/cn";
import { supabase } from "@/services/supabaseClient";
import { QUERY_KEYS } from "@/constants/keys";
import { getAccount } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";

const BalanceCard = ({ className }: { className?: string }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    getSession();
  }, []);

  const { data: accountData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_ACCOUNT, userId],
    queryFn: () => getAccount(userId!),
    enabled: !!userId,
  });

  const balance =
    Array.isArray(accountData) && accountData.length > 0
      ? accountData[0].balance
      : null;

  return (
    <Card className={cn("flex items-end justify-between", className)}>
      <div>
        <div className="flex gap-2 items-center">
          <WalletIcon />
          <p className="text-xs leading-4.5 text-grey-500">Balance</p>
        </div>

        <p className="mt-2 font-bold text-lg leading-6 text-grey-100">
          {isLoading ? <Loader /> : `$${balance?.toFixed(2) ?? "0.00"}`}
        </p>
      </div>

      <BalanceModal variant="primary" />
    </Card>
  );
};

export default BalanceCard;
