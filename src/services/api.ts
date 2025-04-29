import { createAppErrorMessage } from "@/utils/createAppErrorMessage";
import { isServer } from "@/utils/isServer";
import axios from "axios";
import { toast } from "react-toastify";

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
    if (isServer()) {
      const cookies = await import("next/headers");
      const headers = await cookies.headers();
      const cookie = headers.get("cookie");
      if (cookie) {
        config.headers["Cookie"] = cookie;
      }
    } else {
      const token = localStorage.getItem("accessToken");
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
  return await instance.post("rest/v1/rpc/get_coupon_details_by_id", payload);
}
