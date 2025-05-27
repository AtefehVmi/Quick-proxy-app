"use client";

import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import ActivitySidebar from "./ActivitySidebar";
import IspIcon from "public/icons/isp.svg";
import { useState } from "react";
import { IspRecent } from "@/constants/types";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import StatusIcon from "public/icons/bars-filter.svg";
import FilterIcon from "public/icons/filter.svg";
import { createColumnHelper } from "@tanstack/react-table";
import TextSm from "@/components/Typography/TextSm";
import HomeIcon from "public/icons/map-marker-home.svg";
import CaretRightIcon from "public/icons/status.svg";
import ToggleBox from "@/components/ToggleBox";
import { toast } from "react-toastify";
import InterrogationIcon from "public/icons/interrogation.svg";
import ArrowRightIcon from "public/icons/arrow-small-right.svg";
import ActivityTable from "@/modules/shared/ActivityTable";
import { supabase } from "@/services/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import StatusFilter from "@/components/StatusFilter";

const columnHelper = createColumnHelper<any>();

const ActivityControl = () => {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Number(searchParams.get("limit") ?? "10");

  const fetchPaginatedOrders = async (
    from: number,
    to: number,
    status?: string | null
  ) => {
    let query = supabase
      .from("orders")
      .select("*", { count: "exact" })
      .range(from, to)
      .eq("type", "proxy")
      .eq("product_id", 4);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, count, error } = await query;

    if (error) throw new Error(error.message);
    return { data, count };
  };

  const from = offset;
  const to = offset + limit - 1;

  const { data: orders, isLoading } = useQuery({
    queryKey: [...QUERY_KEYS.ISP_ORDERS, offset, limit, statusFilter],
    queryFn: () => fetchPaginatedOrders(from, to, statusFilter),
    staleTime: 1 * 60 * 1000,
  });

  console.log(orders);

  const columns = [
    columnHelper.accessor("user_id", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          User ID
        </TextSm>
      ),
      cell: (info) => (
        <div className="flex items-center gap-1">
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {info.getValue()}
            </TextSm>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("id", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          ID
        </TextSm>
      ),
      cell: (info) => (
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
      ),
    }),
    columnHelper.accessor("product_id", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Product ID
        </TextSm>
      ),
      cell: (info) => (
        <div className="flex items-center gap-1">
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {info.getValue()}
            </TextSm>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("plan_id", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Plan ID
        </TextSm>
      ),
      cell: (info) => (
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Price
        </TextSm>
      ),
      cell: (info) => (
        <div className="flex items-center gap-1">
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {info.getValue()}
            </TextSm>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("final_price", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Final Price
        </TextSm>
      ),
      cell: (info) => (
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
      ),
    }),
    columnHelper.accessor("location_id", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Location ID
        </TextSm>
      ),
      cell: (info) => (
        <div className="flex items-center gap-1">
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {info.getValue()}
            </TextSm>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("provider", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Provider
        </TextSm>
      ),
      cell: (info) => (
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
      ),
    }),
    columnHelper.accessor("quantity", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Quantity
        </TextSm>
      ),
      cell: (info) => (
        <div className="flex items-center gap-1">
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {info.getValue()}
            </TextSm>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("type", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Type
        </TextSm>
      ),
      cell: (info) => (
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
      ),
    }),
    columnHelper.accessor("status", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Status
        </TextSm>
      ),
      cell: (info) => {
        const value = info.getValue();
        const successStatuses = ["processed", "processing", "refunded"];
        const dangerStatuses = [
          "failed",
          "canceled",
          "wrong_amount",
          "system_error",
          "refund_failed",
        ];

        return (
          <div
            className={cn(
              "flex items-center w-fit gap-1",
              successStatuses.includes(value)
                ? "text-success"
                : dangerStatuses.includes(value)
                ? "text-danger"
                : "text-warning"
            )}
          >
            <CaretRightIcon />
            <TextSm className="font-medium whitespace-nowrap">
              {value || "null"}
            </TextSm>
          </div>
        );
      },
    }),
    columnHelper.accessor("status_reason", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Status Reason
        </TextSm>
      ),
      cell: (info) => (
        <div className="flex items-center gap-1">
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {info.getValue()}
            </TextSm>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Created At
        </TextSm>
      ),
      cell: (info) => {
        const formatDate = (timestamp: string): string => {
          const date = new Date(timestamp);
          const day = date.getDate();
          const month = date.toLocaleString("en-GB", { month: "long" });
          const year = date.getFullYear().toString().slice(2);
          return `${day} ${month}, ${year}`;
        };

        return (
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {formatDate(info.getValue())}
            </TextSm>
          </div>
        );
      },
    }),
    columnHelper.accessor("updated_at", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Updated At
        </TextSm>
      ),
      cell: (info) => {
        const formatDate = (timestamp: string): string => {
          const date = new Date(timestamp);
          const day = date.getDate();
          const month = date.toLocaleString("en-GB", { month: "long" });
          const year = date.getFullYear().toString().slice(2);
          return `${day} ${month}, ${year}`;
        };

        return (
          <div className="whitespace-nowrap">
            <TextSm className="font-semibold text-grey-100">
              {formatDate(info.getValue())}
            </TextSm>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: () => null,
      cell: ({ row }) => {
        const rowData = row.original;
        const handleClick = () => {
          if (rowData.status === "Non active") {
            toast.error("This proxy is non active.", {
              icon: <InterrogationIcon />,
            });
          } else {
            setSelectedRow(rowData);
          }
        };

        return (
          <button
            onClick={handleClick}
            className="text-white cursor-pointer"
            aria-label="View details"
          >
            <ArrowRightIcon className="hover:text-primary-400" />
          </button>
        );
      },
    }),
  ];

  return (
    <div className={cn("w-full", "grid grid-cols-1 xl:grid-cols-24 gap-5")}>
      <div className="xl:col-span-16 px-8 pt-6 pb-8">
        <Heading title="ISP Proxies (Static residential)" Icon={IspIcon} />
        <ActivityTable
          isLoading={isLoading}
          tableClass="min-h-[800px]"
          limit={limit}
          offset={offset}
          filterActions={
            <>
              <StatusFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
              <Button variant="black" className="p-2">
                <FilterIcon />
              </Button>
            </>
          }
          columns={columns}
          data={orders?.data ?? []}
          className="mt-6"
        />
      </div>

      <div className="xl:col-span-8 h-full">
        <ActivitySidebar data={selectedRow} />
      </div>
    </div>
  );
};
export default ActivityControl;
