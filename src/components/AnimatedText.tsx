
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  animation: "typewriter" | "flicker" | "fade" | "highlight";
  className?: string;
  delay?: number;
}

export const AnimatedText = ({ 
  text, 
  animation, 
  className = "", 
  delay = 0 
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [letters, setLetters] = useState<string[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    if (animation === "flicker") {
      setLetters(text.split(''));
    }
    
    return () => clearTimeout(timer);
  }, [text, delay, animation]);
  
  if (animation === "typewriter") {
    return (
      <div 
        ref={elementRef}
        className={cn(
          isVisible ? "typewriter" : "opacity-0",
          className
        )}
        style={{
          animation: isVisible ? `typewriter 2.5s steps(40) ${delay}ms forwards, blink 0.8s ease-in-out infinite` : 'none'
        }}
      >
        {text}
      </div>
    );
  }
  
  if (animation === "flicker") {
    return (
      <div className={cn("flex", className)}>
        {letters.map((letter, index) => (
          <span 
            key={index} 
            className={cn(
              "transition-opacity",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              animationDelay: `${delay + (index * 120)}ms`,
              animationDuration: '0.3s',
              transitionDelay: `${index * 50}ms` 
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    );
  }
  
  if (animation === "highlight") {
    return (
      <div 
        ref={elementRef}
        className={cn(
          "relative inline-block",
          isVisible ? "after:w-full" : "after:w-0",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brushed-gold after:transition-all after:duration-1000",
          className
        )}
      >
        {text}
      </div>
    );
  }
  
  // Default fade animation
  return (
    <div 
      ref={elementRef}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {text}
    </div>
  );
};

export default AnimatedText;
