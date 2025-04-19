"use client";

import Card from "@/components/Card/Card";
import cn from "@/utils/cn";
import RecentActivityIcon from "public/icons/recent-activity.svg";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination/Pagination";
import { createColumnHelper } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import StatusIcon from "public/icons/bars-filter.svg";
import FilterIcon from "public/icons/filter.svg";
import { Billing } from "@/constants/types";
import TextSm from "@/components/Typography/TextSm";
import HomeIcon from "public/icons/map-marker-home.svg";
import CaretRightIcon from "public/icons/status.svg";

interface BillingTableProps {
  className?: string;
}

const columnHelper = createColumnHelper<Billing>();

const columns = [
  columnHelper.accessor("type", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Type
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
  columnHelper.accessor("date", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Date
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
  columnHelper.accessor("description", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Description
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
];

const data: Billing[] = [];

const BillingTable = ({ className }: BillingTableProps) => {
  const params = useSearchParams();

  const limit = params.get("limit") ? parseInt(params.get("limit")!) : 3;
  const offset = params.get("offset") ? parseInt(params.get("offset")!) : 0;

  return (
    <Card className={cn("flex flex-col max-h-[840px] p-0", className)}>
      <div className="flex items-center justify-between pt-4.5">
        <div className="flex items-center gap-2">
          <RecentActivityIcon />
          <p className="text-white text-lg font-bold">Recent Activities</p>
        </div>
        <div className="flex items-center gap-2 pt-1 pr-4.5">
          <Button variant="black" className="py-2 px-4" Icon={StatusIcon}>
            Status
          </Button>
          <Button variant="black" className="p-2">
            <FilterIcon />
          </Button>
        </div>
      </div>

      <div className="flex-1 mt-7.5 mb-3 overflow-auto custom-scrollbar px-4.5">
        <Table columns={columns} data={data} />
      </div>

      <div className="border-t border-black-2 pt-3 px-4.5">
        <Pagination
          limit={limit}
          offset={offset}
          isDataAvailable={data.length >= limit}
          totalCount={data.length}
        />
      </div>
    </Card>
  );
};

export default BillingTable;
