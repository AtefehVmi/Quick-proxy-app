"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import WalletIcon from "public/icons/wallet.svg";
import BalanceModal from "@/modules/Modals/BalanceModal";
import cn from "@/utils/cn";
import { supabase } from "@/services/supabaseClient";

const BalanceCard = ({ className }: { className?: string }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error("No session or user", sessionError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("balance")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching balance:", error);
      } else {
        setBalance(data.balance);
      }

      setLoading(false);
    };

    fetchBalance();
  }, []);

  return (
    <Card className={cn("flex items-end justify-between", className)}>
      <div>
        <div className="flex gap-2 items-center">
          <WalletIcon />
          <p className="text-xs leading-4.5 text-grey-500">Balance</p>
        </div>

        <p className="mt-2 font-bold text-lg leading-6 text-grey-100">
          {loading ? "Loading..." : `$${balance?.toFixed(2) ?? "0.00"}`}
        </p>
      </div>

      <BalanceModal variant="primary" />
    </Card>
  );
};

export default BalanceCard;
