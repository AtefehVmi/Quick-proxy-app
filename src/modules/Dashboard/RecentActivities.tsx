"use client";

import Card from "@/components/Card/Card";
import Table from "@/components/Table";
import TextSm from "@/components/Typography/TextSm";
import { RecentActivity } from "@/constants/types";
import { createColumnHelper } from "@tanstack/react-table";
import RecentImage from "public/icons/recent-activity.svg";
import HomeIcon from "public/icons/map-marker-home.svg";
import TextXs from "@/components/Typography/TextXs";
import EyeIcon from "public/icons/eye.svg";
import Button from "@/components/Button";

const columnHelper = createColumnHelper<RecentActivity>();

const columns = [
  columnHelper.accessor("name", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Name
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
          <TextXs className="text-grey-700">Plan 30 days</TextXs>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("purchase", {
    header: () => (
      <TextSm className="text-grey-700 whitespace-nowrap font-normal">
        Purhcase
      </TextSm>
    ),
    cell: (info) => (
      <div className="whitespace-nowrap">
        <TextSm className="font-semibold text-grey-100">
          {info.getValue()}
        </TextSm>
        <TextXs className="text-grey-700">Personal account</TextXs>
      </div>
    ),
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
          <TextXs className="text-grey-700 whitespace-nowrap">
            Last Payment
          </TextXs>
        </div>
      );
    },
  }),
];

const data: RecentActivity[] = [];

const RecentActivities = () => {
  return (
    <Card className="px-0 pt-4.5 pb-0 max-h-[500px] h-full">
      <div className="flex items-center gap-2">
        <RecentImage />
        <p className="text-white text-lg font-bold">Recent Activities</p>
      </div>

      <div className="mt-7.5 max-h-[300px] overflow-auto scrollbar-hide">
        <Table columns={columns} data={data} noDataClassName="h-[300px]" />
      </div>

      {data.length > 0 && (
        <div className="mt-2.5">
          <Button variant="black" className="py-4 w-full" Icon={EyeIcon}>
            View All
          </Button>
        </div>
      )}
    </Card>
  );
};
export default RecentActivities;
