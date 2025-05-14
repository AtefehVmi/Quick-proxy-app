"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/services/supabaseClient";
import { getAccount } from "@/services/api";
import { QUERY_KEYS } from "@/constants/keys";
import Card from "@/components/Card/Card";
import BalanceModal from "../Modals/BalanceModal";
import Loader from "@/components/Loader";
import { useBalance } from "@/hooks/useBalance";

const Balance = () => {
  const { balance, isLoading } = useBalance();

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
