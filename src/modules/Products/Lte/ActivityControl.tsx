"use client";

import Button from "@/components/Button";
import { LteRecent } from "@/constants/types";
import ActivityTable from "@/modules/shared/ActivityTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import StatusIcon from "public/icons/bars-filter.svg";
import FilterIcon from "public/icons/filter.svg";
import TextSm from "@/components/Typography/TextSm";
import cn from "@/utils/cn";
import CaretRightIcon from "public/icons/status.svg";
import { toast } from "react-toastify";
import InterrogationIcon from "public/icons/interrogation.svg";
import ArrowRightIcon from "public/icons/arrow-small-right.svg";
import GenerateProxyModal from "@/modules/Modals/GenerateProxyModal";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";
import { supabase } from "@/services/supabaseClient";
import StatusFilter from "@/components/StatusFilter";
import { getPriceList } from "@/services/api";

const columnHelper = createColumnHelper<any>();

const ActivityControl = ({
  setSelectedRow,
  selectedRow,
}: {
  setSelectedRow: (row: any | null) => void;
  selectedRow: LteRecent | null;
}) => {
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
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
      .eq("product_id", 5);

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
    queryKey: [...QUERY_KEYS.LTE_ORDERS, offset, limit, statusFilter],
    queryFn: () => fetchPaginatedOrders(from, to, statusFilter),
    staleTime: 1 * 60 * 1000,
  });

  const { data: plan } = useQuery({
    queryKey: QUERY_KEYS.PRICING,
    queryFn: () => getPriceList(),
  });

  const columns = [
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
          Product
        </TextSm>
      ),
      cell: (info) => {
        const row = info.row.original;
        const productId = row.product_id;
        const planId = row.plan_id;

        const matchedPlan = plan?.find(
          (plan) => plan.product_id === productId && plan.plan_id === planId
        );

        const label = matchedPlan
          ? `${matchedPlan.plan_category} ${matchedPlan.product_category}`
          : productId;

        const capitalizedLabel =
          typeof label === "string"
            ? label.charAt(0).toUpperCase() + label.slice(1)
            : label;

        return (
          <div className="flex items-center gap-2">
            <div className="whitespace-nowrap">
              <TextSm className="font-semibold text-grey-100">
                {capitalizedLabel}
              </TextSm>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("plan_id", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Plan
        </TextSm>
      ),
      cell: (info) => {
        const row = info.row.original;
        const productId = row.product_id;
        const planId = row.plan_id;

        const matchedPlan = plan?.find(
          (plan) => plan.product_id === productId && plan.plan_id === planId
        );

        const label = matchedPlan ? matchedPlan.plan_name : planId;

        return (
          <div className="flex items-center gap-2">
            <div className="whitespace-nowrap">
              <TextSm className="font-semibold text-grey-100">{label}</TextSm>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("final_price", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Price
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
    columnHelper.accessor("provider", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Provider
        </TextSm>
      ),
      cell: (info) => (
        <div className="whitespace-nowrap">
          <TextSm className="font-semibold text-grey-100">
            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
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
            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
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
        const value =
          info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1);

        const successStatuses = ["Processed", "Processing", "Refunded"];
        const dangerStatuses = [
          "Failed",
          "Canceled",
          "Wrong_amount",
          "System_error",
          "Refund_failed",
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
    columnHelper.accessor("created_at", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Created
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
            setOpenModal(true);
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
    <>
      <ActivityTable
        tableHeight="max-h-[300px]"
        isLoading={isLoading}
        className="mt-5"
        data={orders?.data ?? []}
        columns={columns}
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
      />

      {selectedRow && (
        <GenerateProxyModal
          open={openModal}
          setOpen={setOpenModal}
          data={selectedRow}
        />
      )}
    </>
  );
};
export default ActivityControl;
