"use client";

import Card from "@/components/Card/Card";
import cn from "@/utils/cn";
import RecentActivityIcon from "public/icons/recent-activity.svg";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination/Pagination";
import { createColumnHelper } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import FilterIcon from "public/icons/filter.svg";
import { Billing } from "@/constants/types";
import TextSm from "@/components/Typography/TextSm";
import HomeIcon from "public/icons/map-marker-home.svg";
import CaretRightIcon from "public/icons/status.svg";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/services/supabaseClient";
import { useState } from "react";
import StatusFilter from "@/components/StatusFilter";

interface BillingTableProps {
  className?: string;
  size?: string;
  filters?: boolean;
  tableHeight?: string;
}

const columnHelper = createColumnHelper<Billing>();

const columns = [
  columnHelper.accessor("user_id", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        User ID
      </TextSm>
    ),
    cell: (info) => (
      <div className="flex items-center gap-2">
        <div className="bg-black-2">
          <HomeIcon className="m-2.5" />
        </div>
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
      <div className="flex items-center gap-2">
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
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
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
      <div className="flex items-center gap-2">
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
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
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
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
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
      <div className="whitespace-nowrap">
        <TextSm className="font-semibold text-grey-100">
          $ {info.getValue()}
        </TextSm>
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
          $ {info.getValue()}
        </TextSm>
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
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
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
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("coupon_id", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Coupon ID
      </TextSm>
    ),
    cell: (info) => (
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue()}
          </TextSm>
        </div>
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
      return (
        <div
          className={cn(
            "flex items-center w-fit gap-1",
            value === "Active"
              ? "text-success"
              : value === "Non active"
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
      <div className="flex items-center gap-2">
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
];

const BillingTable = ({
  className,
  size,
  filters,
  tableHeight,
}: BillingTableProps) => {
  const searchParams = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Number(searchParams.get("limit") ?? size ?? "10");

  const { userId } = useUser();
  const isUserReady = !!userId;

  const fetchPaginatedOrders = async (
    from: number,
    to: number,
    status?: string | null
  ) => {
    let query = supabase.from("orders").select("*", { count: "exact" });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) throw new Error(error.message);
    return { data, count };
  };

  const from = offset;
  const to = offset + limit - 1;

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, offset, limit, statusFilter],
    queryFn: () => fetchPaginatedOrders(from, to, statusFilter),
    enabled: isUserReady,
    staleTime: 1 * 60 * 1000,
  });

  return (
    <Card className={cn("flex flex-col max-h-[840px] p-0", className)}>
      <div className="flex items-center justify-between pt-4.5">
        <div className="flex items-center gap-2">
          <RecentActivityIcon />
          <p className="text-white text-lg font-bold">Recent Activities</p>
        </div>
        {filters && (
          <div className="flex items-center gap-2 pt-1 pr-4.5">
            <StatusFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            <Button variant="black" className="p-2">
              <FilterIcon />
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 mt-7.5 mb-3 custom-scrollbar px-4.5 max-w-full relative w-full overflow-auto">
        <Table
          tableHeight={tableHeight}
          isLoading={isLoading}
          columns={columns}
          data={data?.data ?? []}
        />
      </div>

      <div className="border-t border-black-2 pt-3 px-4.5">
        <Pagination
          limit={limit}
          offset={offset}
          isDataAvailable={(data?.data?.length ?? 0) >= limit}
          totalCount={data?.count ?? undefined}
        />
      </div>
    </Card>
  );
};

export default BillingTable;
