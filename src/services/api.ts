import { createAppErrorMessage } from "@/utils/createAppErrorMessage";
import { isServer } from "@/utils/isServer";
import axios from "axios";
import { toast } from "react-toastify";
import { supabase } from "./supabaseClient";

const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const instance = axios.create({
  baseURL: `${baseURL}/rest/v1`,
  headers: {
    "Content-Type": "application/json",
    apikey: apiKey,
  },
});

instance.interceptors.request.use(
  async (config) => {
    if (!isServer()) {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (!isServer()) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        location.replace("/sign-in");
      }
      if (error.response?.status === 500) {
        toast.error("Something unexpected happened");
      }
    }

    error.appError = createAppErrorMessage(error);
    return Promise.reject(error);
  }
);

export async function getCoupon(payload: {
  coupon_code: string;
}): Promise<any> {
  return await instance.post("/rpc/get_coupon_details_by_code", payload);
}

export async function getAccount(id: string): Promise<any> {
  return await instance.get(`/accounts?user_id=eq.${id}`);
}
