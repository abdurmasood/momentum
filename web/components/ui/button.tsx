"use client";

import { forwardRef } from "react";
import { m, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantStyles = {
  primary: [
    "bg-gradient-to-r from-accent-purple to-accent-blue",
    "text-white shadow-lg",
    "hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]",
  ],
  secondary: ["glass glass-hover glow-interactive", "text-text-primary"],
  ghost: [
    "text-text-secondary hover:text-text-primary",
    "hover:bg-white/5",
    "active:bg-white/10",
  ],
  danger: [
    "bg-red-500/20 border border-red-500/30",
    "text-red-300 hover:bg-red-500/30",
  ],
} as const;

const sizeStyles = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
} as const;

/**
 * Glassmorphic button with gradient glow effects
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <m.button
        ref={ref}
        whileTap={{ opacity: disabled || isLoading ? 1 : 0.9 }}
        transition={{ duration: 0.1 }}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium",
          "rounded-lg transition-all focus-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          // Size
          sizeStyles[size],
          // Variant
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </m.button>
    );
  }
);

Button.displayName = "Button";
