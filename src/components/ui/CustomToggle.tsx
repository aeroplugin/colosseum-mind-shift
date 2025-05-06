
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CustomToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  className?: string;
}

const CustomToggle: React.FC<CustomToggleProps> = ({
  value,
  onChange,
  label,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {label && (
        <label className="text-[#D8C5A3] uppercase text-xs tracking-wider font-trajan">{label}</label>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={cn(
          "relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-[#D8C5A3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          value ? "bg-[#004F2D]" : "bg-[#121212]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-7 w-7 rounded-full bg-[#F5F5F5] shadow-lg ring-0 transition-transform",
            value ? "translate-x-8" : "translate-x-0"
          )}
        />
      </button>
      <span className="ml-2 text-[#F5F5F5] text-sm">
        {value ? "Yes" : "No"}
      </span>
    </div>
  );
};

export default CustomToggle;
