"use client";

import Button from "@/components/Button";
import Card from "@/components/Card/Card";
import AddIcon from "public/icons/add.svg";
import BalanceModal from "../Modals/BalanceModal";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";

const Balance = () => {
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
    <Card className="py-4 px-4.5 bg-balance">
      <p className="text-lg text-grey-500 leading-9">Balance</p>
      <div className="flex items-center justify-between mt-9">
        <p className="text-grey-100 font-bold text-2xl 2xl:text-32">
          {loading ? "Loading..." : `$${balance?.toFixed(2) ?? "0.00"}`}
        </p>
        <BalanceModal variant="black" />
      </div>
    </Card>
  );
};
export default Balance;
