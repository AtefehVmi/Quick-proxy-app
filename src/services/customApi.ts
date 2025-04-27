import { createAppErrorMessage } from "@/utils/createAppErrorMessage";
import { isServer } from "@/utils/isServer";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CountriesResponse,
  PriceListApiResponse,
  PriceListResponse,
} from "./models";

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

export async function getResiCountries(id: number): Promise<CountriesResponse> {
  return await customInstance.get(`products/countries/${id}`);
}
