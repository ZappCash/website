"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface InteractiveHoverButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  hoverBgColor?: string;
  dotColor?: string;
  showDot?: boolean;
}

const InteractiveHoverButton = forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ className, text = "Button", hoverBgColor = "bg-primary", dotColor = "bg-primary", showDot = true, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full p-2 px-6 text-center font-semibold bg-primary",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {showDot && (
          <div className={cn("size-2 scale-100 rounded-lg transition-all duration-300 group-hover:scale-[100.8]", dotColor)}></div>
        )}
        <span className="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children || text}
        </span>
      </div>

      <div className={cn(
        "absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100",
        hoverBgColor
      )}>
        <span className="whitespace-nowrap">{children || text}</span>
        <ArrowRight className="size-5" />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
export default InteractiveHoverButton;
