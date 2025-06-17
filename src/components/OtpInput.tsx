import { useRef } from "react";

export default function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;

    if (!/^\d*$/.test(val)) return;

    const updatedValue = value.split("");

    updatedValue[index] = val.charAt(val.length - 1) || "";

    const fullValue = Array(6)
      .fill("")
      .map((_, i) => updatedValue[i] || "")
      .join("");

    onChange(fullValue);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
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
    <div className="flex gap-4">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-17 h-17 border border-border-grey/15 bg-transparent text-white text-center text-xl focus:outline-none focus:border-primary-400"
        />
      ))}
    </div>
  );
}
