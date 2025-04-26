import axios from "axios";
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
    if (typeof window !== "undefined") {
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
