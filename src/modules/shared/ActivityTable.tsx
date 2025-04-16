"use client";

import Card from "@/components/Card/Card";
import cn from "@/utils/cn";
import RecentActivityIcon from "public/icons/recent-activity.svg";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination/Pagination";
import { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";

interface ActivityTableProps<T extends object> {
  filterActions?: ReactNode;
  data: T[];
  columns: ColumnDef<T, any>[];
  limit: number;
  offset: number;
  className?: string;
  tableClass?: string;
}

const ActivityTable = <T extends object>({
  className,
  filterActions,
  limit,
  offset,
  data,
  columns,
  tableClass,
}: ActivityTableProps<T>) => {
  return (
    <Card className={cn("flex flex-col max-h-[840px] p-0", className)}>
      <div className="flex items-center justify-between pt-4.5">
        <div className="flex items-center gap-2">
          <RecentActivityIcon />
          <p className="text-white text-lg font-bold">Recent Activities</p>
        </div>
        <div className="flex items-center gap-2 pt-1 pr-4.5">
          {filterActions && <>{filterActions}</>}
        </div>
      </div>

      <div className="flex-1 mt-7.5 mb-3 overflow-auto custom-scrollbar px-4.5">
        <Table columns={columns} data={data} className={tableClass} />
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

export default ActivityTable;
