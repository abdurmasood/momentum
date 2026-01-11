import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
} as const;

/**
 * Glassmorphic input with focus glow ring
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size = "md", error, leftIcon, rightIcon, ...props },
    ref
  ) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            // Base styles
            "w-full rounded-lg bg-white/5 backdrop-blur-sm",
            "text-text-primary placeholder:text-text-muted",
            "border border-glass-border",
            // Focus states
            "focus:outline-none focus:border-white/20",
            "focus:ring-2 focus:ring-accent-purple/20",
            "focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]",
            // Transitions
            "transition-all duration-200",
            // Error state
            error && "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20",
            // Icon padding
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            // Size
            sizeStyles[size],
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {rightIcon}
          </div>
        )}
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
