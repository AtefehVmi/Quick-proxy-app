import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <span className="flex items-center justify-center pl-1 h-4">
      <span
        className={`inline-block xl:h-3 xl:w-3 w-3 h-3 animate-spin rounded-full border-2 border-solid border-current 
            border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
              className ?? ""
            }`}
        role="status"
      />
    </span>
  );
};

export default Loader;
