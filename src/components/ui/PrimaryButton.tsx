
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { theme } from "@/lib/theme";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  className, 
  variant = "primary", 
  size = "default",
  ...props 
}) => {
  const variantStyles = {
    primary: "bg-[#004F2D] text-[#F5F5F5] hover:bg-[#006E4A]",
    secondary: "bg-transparent border border-[#D8C5A3] text-[#D8C5A3] hover:bg-[rgba(216,197,163,0.1)]",
    outline: "bg-transparent border border-[#D8C5A3] text-[#D8C5A3] hover:bg-[rgba(216,197,163,0.1)]",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 py-1.5 text-sm",
    lg: "h-12 px-6 py-3 text-lg"
  };

  return (
    <Button 
      className={cn(
        "rounded-full transition-all transform active:scale-95",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
