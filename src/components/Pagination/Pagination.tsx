"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import style from "./pagination.module.css";

import NextIcon from "public/icons/chevron-right.svg";
import PaginationButton from "./PaginationButton";
import PaginationButtton from "./PaginationButton";
import LastPageIcon from "public/icons/double-arrow-right.svg";

interface PaginationProps {
  limit: number;
  offset: number;
  totalCount?: number;
  isDataAvailable: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  limit,
  offset,
  totalCount,
  isDataAvailable,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [currentLimit, setCurrentLimit] = useState<number>(limit);
  const [currentOffset, setCurrentOffset] = useState<number>(offset);
  const [totalPages, setTotalPages] = useState<number | undefined>(1);

  useEffect(() => {
    if (!totalCount) {
      return setTotalPages(undefined);
    }
    setTotalPages(Math.ceil(totalCount / currentLimit));
  }, [totalCount, currentLimit]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newLimit = Number(params.get("limit") ?? limit);
    const newOffset = Number(params.get("offset") ?? offset);
    setCurrentLimit(newLimit);
    setCurrentOffset(newOffset);
  }, [searchParams.toString()]);

  const handlePageChange = (newOffset: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("offset", newOffset.toString());
    setCurrentOffset(newOffset);
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  const handleSetLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    params.set("offset", "0");
    setCurrentLimit(newLimit);
    setCurrentOffset(0);
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  const pageNumberButtons = () => {
    const currentPage = Math.floor(currentOffset / currentLimit) + 1;
    if (!totalPages) {
      return <></>;
    }
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => (
        <PaginationButton
          key={i + 1}
          pageNumber={i + 1}
          currentPage={currentPage}
          onClick={() => handlePageChange(i * currentLimit)}
        />
      ));
    } else {
      const pages = [];
      if (currentPage > 2) {
        pages.push(
          <PaginationButtton
            key={1}
            pageNumber={1}
            currentPage={currentPage}
            onClick={() => handlePageChange(0)}
          />
        );
        pages.push(
          <span
            key="start-ellipsis"
            className="px-3.5 py-2 h-full text-sm font-medium"
          >
            ...
          </span>
        );
      }
      if (currentPage > 1) {
        pages.push(
          <PaginationButton
            key={currentPage - 1}
            pageNumber={currentPage - 1}
            currentPage={currentPage}
            onClick={() => handlePageChange((currentPage - 2) * currentLimit)}
          />
        );
      }
      pages.push(
        <PaginationButton
          key={currentPage}
          pageNumber={currentPage}
          currentPage={currentPage}
          onClick={() => handlePageChange((currentPage - 1) * currentLimit)}
        />
      );
      if (currentPage < totalPages) {
        pages.push(
          <PaginationButton
            key={currentPage + 1}
            pageNumber={currentPage + 1}
            currentPage={currentPage}
            onClick={() => handlePageChange(currentPage * currentLimit)}
          />
        );
      }
      if (currentPage < totalPages - 1) {
        pages.push(
          <span
            key="end-ellipsis"
            className="px-3.5 py-2 h-full text-sm font-medium"
          >
            ...
          </span>
        );
        pages.push(
          <PaginationButton
            key={totalPages}
            pageNumber={totalPages}
            currentPage={currentPage}
            onClick={() => handlePageChange((totalPages - 1) * currentLimit)}
          />
        );
      }
      return pages;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentPage = Math.floor(currentOffset / currentLimit) + 1;

  return (
    <div className="flex flex-col lg:flex-row pt-0.5 justify-between">
      <p className="text-sm leading-6 text-bgGrey-100">
        <span className="">{isDataAvailable ? currentOffset + 1 : 0}</span>
        {"–"}
        <span className="text-bgGrey-100">
          {isDataAvailable
            ? Math.min(currentOffset + currentLimit, totalCount ?? 0)
            : 0}
        </span>{" "}
        of {totalCount}
      </p>

      <div className="flex items-center justify-center gap-1 px-3">
        <button
          className="p-1.25 h-full cursor-pointer"
          onClick={() => handlePageChange(0)}
          disabled={currentOffset === 0}
        >
          <LastPageIcon className="rotate-180" />
        </button>

        <button
          className="p-1.25 h-full cursor-pointer"
          onClick={() => handlePageChange(currentOffset - currentLimit)}
          disabled={currentOffset === 0}
        >
          <NextIcon className="rotate-180" />
        </button>

        <button
          className="p-1.25 cursor-pointer"
          onClick={() => handlePageChange(currentOffset + currentLimit)}
          disabled={
            !isDataAvailable ||
            (!!totalCount && currentOffset + currentLimit >= totalCount)
          }
        >
          <NextIcon />
        </button>

        <button
          className="p-1.25 cursor-pointer"
          onClick={() =>
            totalCount &&
            handlePageChange(
              Math.floor((totalCount - 1) / currentLimit) * currentLimit
            )
          }
          disabled={!isDataAvailable || !totalCount}
        >
          <LastPageIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
