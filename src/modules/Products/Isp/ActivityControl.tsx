"use client";

import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import ActivityTable from "./ActivityTable";
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

const data: IspRecent[] = [
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

const columnHelper = createColumnHelper<IspRecent>();

const ActivityControl = () => {
  const [selectedRow, setSelectedRow] = useState<IspRecent | null>(null);
  const params = useSearchParams();

  const limit = params.get("limit") ? parseInt(params.get("limit")!) : 3;
  const offset = params.get("offset") ? parseInt(params.get("offset")!) : 0;

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
            <ArrowRightIcon />
          </button>
        );
      },
    }),
  ];

  return (
    <div className={cn("w-full", "grid grid-cols-24 gap-5")}>
      <div className="col-span-16 px-8 pt-6 pb-8">
        <Heading title="ISP Proxies (Static residential)" Icon={IspIcon} />
        <ActivityTable
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
          columns={columns}
          data={data}
          className="mt-6"
        />
      </div>

      <div className="col-span-8">
        <ActivitySidebar data={selectedRow} />
      </div>
    </div>
  );
};
export default ActivityControl;
