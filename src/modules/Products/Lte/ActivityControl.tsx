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

const data: LteRecent[] = [];

const columnHelper = createColumnHelper<LteRecent>();

const ActivityControl = ({
  setSelectedRow,
  selectedRow,
}: {
  setSelectedRow: (row: LteRecent | null) => void;
  selectedRow: LteRecent | null;
}) => {
  const params = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  const limit = params.get("limit") ? parseInt(params.get("limit")!) : 3;
  const offset = params.get("offset") ? parseInt(params.get("offset")!) : 0;

  const columns = [
    columnHelper.accessor("country", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          Country
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
    columnHelper.accessor("city", {
      header: () => (
        <TextSm className="text-grey-700 whitespace-nowrap font-normal">
          City
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
        data={data}
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
