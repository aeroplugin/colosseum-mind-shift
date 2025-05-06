
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CustomSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onValueChange,
  min = 1,
  max = 10,
  step = 1,
  label,
  className
}) => {
  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-[#D8C5A3] uppercase text-xs tracking-wider font-trajan">{label}</label>
          <span className="text-[#F5F5F5] font-bold">{value[0]}</span>
        </div>
      )}
      <Slider
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        className="[&>.cursor]:bg-[#004F2D] [&>.cursor]:border-[#D8C5A3] [&_[data-orientation=horizontal]>.range]:bg-[#004F2D]"
      />
      <div className="flex justify-between text-[#B3B3B3] text-xs">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default CustomSlider;
