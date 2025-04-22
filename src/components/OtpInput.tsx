"use client";

import { useRef } from "react";

export default function OtpInput() {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value.length > 1) {
      e.target.value = value.charAt(value.length - 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-9.25">
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-17 h-17 border border-border-grey/15 bg-transparent text-white text-center text-xl focus:outline-none focus:border-primary-400"
        />
      ))}
    </div>
  );
}
