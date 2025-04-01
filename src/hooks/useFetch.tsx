"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface FetchConfig<T> {
  toastOnError?: boolean;
  toastOnSuccess?: boolean;
  transform?: (data: T) => T;
}

interface FetchResult<T> {
  fetch: (...args: any[]) => Promise<T>;
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ApiResponse {
  error?: boolean;
  message?: string;
  [key: string]: any;
}

function useFetch<T extends ApiResponse>(
  fetchFunction: (...args: any[]) => Promise<T>,
  shouldFetch: boolean,
  config: FetchConfig<T> = { toastOnError: false, transform: undefined },
  ...args: any[]
): FetchResult<T> {
  const { toastOnError, transform } = config;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(shouldFetch ? true : false);
  const [error, setError] = useState<string | null>(null);

  function fetch(...args: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      let errorMessage = "";
      setLoading(true);
      setError(null);
      fetchFunction(...args)
        .then((data: T) => {
          setLoading(false);
          if (toastOnError) {
            if (data.error) {
              toast.error(data.message || "An error occurred");
              reject({ data });
            }
          }
          let transformed = data;
          if (transform) {
            transformed = transform(data);
          }
          setData(transformed);
          resolve(transformed);
        })
        .catch((err: any) => {
          setLoading(false);
          if (!err?.status) {
            errorMessage = "Something unexpected happened, please try again";
            setError(errorMessage);
          } else {
            const detail = err?.data?.message || err?.response?.data?.message;
            if (Array.isArray(detail)) {
              errorMessage = detail[0];
              setError(detail[0]);
            } else {
              errorMessage = detail;
              setError(detail);
            }
          }

          if (toastOnError) {
            if (typeof errorMessage !== "string") {
              errorMessage =
                "Couldn't complete your action. Please try again later.";
            }
            toast.error(errorMessage);
          }
          reject({ err, text: errorMessage });
        });
    });
  }

  useEffect(() => {
    if (shouldFetch) {
      fetch(...args);
    }
  }, [shouldFetch, fetchFunction, ...args]);

  return { fetch, data, loading, error };
}

export default useFetch;
