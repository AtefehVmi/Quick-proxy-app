import React from "react";

interface PaginationButtonProps {
  pageNumber: number;
  currentPage: number;
  onClick: (pageNumber: number) => void;
  disabled?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNumber,
  currentPage,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`p-2 h-full text-sm ${
        currentPage === pageNumber ? "text-white" : "text-grey-700"
      }`}
      onClick={() => onClick(pageNumber)}
      disabled={disabled}
    >
      {pageNumber}
    </button>
  );
};

export default PaginationButton;
