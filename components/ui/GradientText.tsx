import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  animated?: boolean;
  children: ReactNode;
}

export default function GradientText({
  animated = false,
  children,
  className,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "gradient-text",
        animated && "gradient-text-animated",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
