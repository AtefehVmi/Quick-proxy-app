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

const columnHelper = createColumnHelper<any>();

const ActivityControl = ({
  setSelectedRow,
  selectedRow,
}: {
  setSelectedRow: (row: LteRecent | null) => void;
  selectedRow: LteRecent | null;
}) => {
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Number(searchParams.get("limit") ?? "10");

  const fetchPaginatedOrders = async (from: number, to: number) => {
    const { data, error, count } = await supabase
      .from("orders")
      .select("*", { count: "exact" })
      .range(from, to)
      .eq("type", "proxy")
      .eq("product_id", 5);

    if (error) throw new Error(error.message);
    return { data, count };
  };

  const from = offset;
  const to = offset + limit - 1;

  const { data: orders } = useQuery({
    queryKey: [...QUERY_KEYS.LTE_ORDERS, offset, limit],
    queryFn: () => fetchPaginatedOrders(from, to),
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
        className="mt-5"
        data={orders?.data ?? []}
        columns={columns}
        limit={limit}
        offset={offset}
        filterActions={
          <>
            <Button variant="black" className="py-2 px-4" Icon={StatusIcon}>
              Status
            </Button>
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
