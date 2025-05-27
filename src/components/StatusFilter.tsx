"use client";

import cn from "@/utils/cn";
import Button from "./Button";
import { useState } from "react";
import StatusIcon from "public/icons/bars-filter.svg";

const statusOptions = [
  "failed",
  "Pending",
  "processing",
  "processed",
  "wrong_amount",
  "wrong_amount_waiting",
  "system_error",
  "canceled",
  "refund_pending",
  "refund_failed",
  "refunded",
];

const StatusFilter = ({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: string | null;
  setStatusFilter: (statusFilter: string | null) => void;
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
        variant="black"
        className="py-2 px-4"
        Icon={StatusIcon}
      >
        Status
      </Button>
      {showStatusDropdown && (
        <div className="absolute top-12 right-0 z-10 bg-black-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              className={cn(
                "block w-full text-left px-4 py-2 hover:bg-black cursor-pointer",
                status === statusFilter
                  ? "font-bold text-success"
                  : "text-grey-100"
              )}
              onClick={() => {
                setStatusFilter(status === statusFilter ? null : status);
                setShowStatusDropdown(false);
              }}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default StatusFilter;
