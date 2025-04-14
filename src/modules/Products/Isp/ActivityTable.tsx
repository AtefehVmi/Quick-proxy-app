"use client";

import Card from "@/components/Card/Card";
import cn from "@/utils/cn";
import RecentActivityIcon from "public/icons/recent-activity.svg";
import HomeIcon from "public/icons/map-marker-home.svg";
import { IspRecent } from "@/constants/types";
import TextSm from "@/components/Typography/TextSm";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import CaretRightIcon from "public/icons/status.svg";
import ToggleBox from "@/components/ToggleBox";
import ArrowRightIcon from "public/icons/arrow-small-right.svg";
import Button from "@/components/Button";

const columnHelper = createColumnHelper<IspRecent>();

const columns = [
  columnHelper.accessor("plan", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Plan
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
  columnHelper.accessor("location", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Location
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
  columnHelper.accessor("remain_time", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        remaining Time
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
  columnHelper.accessor("auto_renew", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Auto renew
      </TextSm>
    ),
    cell: (info) => {
      return <ToggleBox checked={info.getValue()} />;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => null,
    cell: ({ row }) => (
      <button
        onClick={() => {
          const rowData = row.original;
          console.log("Action on row:", rowData);
        }}
        className="text-white cursor-pointer"
      >
        <ArrowRightIcon />
      </button>
    ),
  }),
];

const data: IspRecent[] = [
  {
    plan: "Plan 30 days",
    location: "United States",
    remain_time: "12 days",
    quantity: 100,
    status: "Active",
    date: "2025-04-01T10:20:30Z",
    auto_renew: true,
  },
  {
    plan: "Plan 10 days",
    location: "Germany",
    remain_time: "5 days",
    quantity: 50,
    status: "Non active",
    date: "2025-03-20T08:15:00Z",
    auto_renew: false,
  },
  {
    plan: "Plan 60 days",
    location: "Canada",
    remain_time: "28 days",
    quantity: 200,
    status: "Expiring soon",
    date: "2025-04-10T13:45:00Z",
    auto_renew: false,
  },
  {
    plan: "Plan 90 days",
    location: "United Kingdom",
    remain_time: "1 day",
    quantity: 25,
    status: "Expiring soon",
    date: "2025-03-30T11:00:00Z",
    auto_renew: false,
  },
  {
    plan: "Plan 120 days",
    location: "Japan",
    remain_time: "15 days",
    quantity: 75,
    status: "Active",
    date: "2025-04-05T09:00:00Z",
    auto_renew: false,
  },
];

const ActivityTable = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("p-0", className)}>
      <div className="flex items-center gap-2 pt-4.5">
        <RecentActivityIcon />
        <p className="text-white text-lg font-bold">Recent Activities</p>
      </div>

      <div className="mt-7.5">
        <Table columns={columns} data={data} />
      </div>
    </Card>
  );
};
export default ActivityTable;
