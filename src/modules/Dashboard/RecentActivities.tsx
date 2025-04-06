"use client";

import Card from "@/components/Card/Card";
import Table from "@/components/Table";
import { RecentActivity } from "@/constants/types";
import { createColumnHelper } from "@tanstack/react-table";
import RecentImage from "public/icons/recent-activity.svg";

const columnHelper = createColumnHelper<RecentActivity>();

const columns = [
  columnHelper.accessor("name", {
    header: () => (
      <p className="text-grey3 font-semibold whitespace-nowrap">ID</p>
    ),
    cell: (info) => <p className="font-medium">{info.getValue()}</p>,
  }),
  columnHelper.accessor("purchase", {
    header: () => (
      <p className="text-grey3 font-semibold whitespace-nowrap">Amount</p>
    ),
    cell: (info) => <p className="font-medium">${info.getValue()}</p>,
  }),
  columnHelper.accessor("date", {
    header: () => (
      <p className="text-grey3 font-semibold whitespace-nowrap">Date</p>
    ),
    cell: (info) => {
      const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(",", "");
      };

      return <p className="font-medium">{formatDate(info.getValue())}</p>;
    },
  }),
];

const mockData: RecentActivity[] = [
  {
    name: "John Doe",
    purchase: "$150.75",
    date: "2025-04-05T14:30:00Z",
  },
  {
    name: "Jane Smith",
    purchase: "$95.40",
    date: "2025-04-05T13:00:00Z",
  },
  {
    name: "Alice Johnson",
    purchase: "$200.50",
    date: "2025-04-04T18:45:00Z",
  },
  {
    name: "Bob Brown",
    purchase: "$50.20",
    date: "2025-04-03T09:15:00Z",
  },
  {
    name: "Charlie Williams",
    purchase: "$300.00",
    date: "2025-04-02T16:30:00Z",
  },
];

const RecentActivities = () => {
  return (
    <Card className="px-0 pt-4.5">
      <div className="flex items-center gap-2">
        <RecentImage />
        <p className="text-white text-lg font-bold">Recent Activities</p>
      </div>

      <div className="mt-7.5">
        {/* <Table columns={columns} data={mockData} /> */}
      </div>
    </Card>
  );
};
export default RecentActivities;
