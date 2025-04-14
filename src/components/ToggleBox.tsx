import cn from "@/utils/cn";
import React from "react";

interface ToggleBoxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleBox: React.FC<ToggleBoxProps> = ({ checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={!onChange}
      />
      <div
        className={cn(
          "relative w-17.5 h-9 transition-all",
          "after:absolute after:top-1 after:left-1 after:h-7 after:w-7 after:transition-all",
          checked
            ? "bg-primary-400 after:bg-black after:translate-x-8.5"
            : "bg-black-border after:bg-black-3"
        )}
      ></div>
    </label>
  );
};

export default ToggleBox;
