
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { theme } from "@/lib/theme";
import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
  icon?: ReactNode;
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(({ 
  children, 
  className, 
  variant = "primary", 
  size = "default",
  icon,
  ...props 
}, ref) => {
  const variantStyles = {
    primary: "btn-luxury bg-emerald text-beige-cream hover:bg-emerald/90",
    secondary: "btn-luxury-outline",
    outline: "backdrop-blur-sm bg-transparent border border-brushed-gold/50 text-brushed-gold hover:bg-brushed-gold/10",
    ghost: "bg-transparent text-brushed-gold hover:bg-brushed-gold/10 hover:text-beige-cream",
  };

  const sizeStyles = {
    default: "h-12 px-6 py-3",
    sm: "h-9 px-4 py-2 text-sm",
    lg: "h-14 px-8 py-4 text-lg",
    icon: "h-10 w-10 p-2"
  };

  // Animation effect - ripple on click
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");
    
    // Remove existing ripples
    const rippleContainer = button.querySelector(".ripple-container");
    if (rippleContainer) {
      rippleContainer.innerHTML = "";
      rippleContainer.appendChild(ripple);
    }
  };

  return (
    <Button 
      className={cn(
        "relative overflow-hidden transition-all",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      ref={ref}
      onClick={(e) => {
        handleRipple(e);
        props.onClick?.(e);
      }}
      {...props}
    >
      <div className="ripple-container absolute inset-0 pointer-events-none"></div>
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </div>
    </Button>
  );
});

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
