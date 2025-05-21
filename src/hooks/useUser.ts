"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import { supabase } from "@/services/supabaseClient";
import { getAccount } from "@/services/api";

export const useUser = () => {
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

  const {
    data: accountData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ACCOUNT, userId],
    queryFn: () => getAccount(userId!),
    enabled: !!userId,
  });

  const balance =
    Array.isArray(accountData) && accountData.length > 0
      ? accountData[0].balance
      : null;

  const id =
    Array.isArray(accountData) && accountData.length > 0
      ? accountData[0].subuser
      : null;

  const total_spending =
    Array.isArray(accountData) && accountData.length > 0
      ? accountData[0].total_spending
      : null;

  const total_orders =
    Array.isArray(accountData) && accountData.length > 0
      ? accountData[0].total_orders
      : null;

  const updated_at =
    Array.isArray(accountData) && accountData.length > 0
      ? accountData[0].updated_at
      : null;

  return {
    balance,
    isLoading,
    error,
    userId,
    id,
    total_spending,
    total_orders,
    updated_at,
  };
};
