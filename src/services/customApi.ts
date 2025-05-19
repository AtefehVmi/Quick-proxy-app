import { createAppErrorMessage } from "@/utils/createAppErrorMessage";
import { isServer } from "@/utils/isServer";
import axios from "axios";
import { toast } from "react-toastify";
import { PriceListApiResponse } from "./models";

export const customInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

customInstance.interceptors.request.use(
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

customInstance.interceptors.response.use(
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

export async function getPriceList(): Promise<PriceListApiResponse> {
  return await customInstance.get("pricing");
}

export async function getResiCountries(): Promise<any> {
  return await customInstance.get(`residential/countries`);
}

export async function getIspCountries(id: number): Promise<any> {
  return await customInstance.get(`products/countries/${id}`);
}

export async function getLteRegions(): Promise<any> {
  return await customInstance.get(`products/lte/regions`);
}

export async function getLteUsRegions(): Promise<any> {
  return await customInstance.get("products/lte/regions/us");
}

export async function GenerateRotatingResi(payload: {
  quantity: number;
  rotation: string;
  port: string;
  format: string;
  country?: string;
  subuser?: number;
}): Promise<any> {
  return await customInstance.post("residential/generate", payload);
}

export async function getSubuser(id: number): Promise<any> {
  return await customInstance.get(`subusers/${id}`);
}

export async function CreateOrder(payload: {
  type: string;
  product?: number;
  plan?: number;
  location?: number;
  quantity?: number;
  port?: string;
  amount?: number;
  provider?: string;
  coupon?: string;
}): Promise<any> {
  return await customInstance.post("orders", payload);
}

export async function getUserDetails(id: number) {
  const { data } = await customInstance.get(`subusers/${id}`);
  return data;
}
