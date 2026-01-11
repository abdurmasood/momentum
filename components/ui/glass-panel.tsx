import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Intensity of blur effect */
  blur?: "normal" | "heavy";
  /** Enable hover state styling */
  hoverable?: boolean;
  /** Enable glow effect on hover/focus */
  glow?: boolean;
}

/**
 * Base glassmorphism container component
 * Provides consistent glass styling across the app
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    { className, blur = "normal", hoverable = false, glow = false, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
          blur === "normal" ? "glass" : "glass-heavy",
          hoverable && "glass-hover cursor-pointer",
          glow && "glow-interactive",
          className
        )}
        {...props}
      />
    );
  }
);

GlassPanel.displayName = "GlassPanel";
