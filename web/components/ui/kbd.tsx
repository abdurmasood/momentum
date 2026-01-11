import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Render as a key combination */
  keys?: string[];
}

/**
 * Maps key names to their display symbols
 */
const keySymbols: Record<string, string> = {
  Meta: "⌘",
  Command: "⌘",
  Cmd: "⌘",
  Control: "⌃",
  Ctrl: "⌃",
  Alt: "⌥",
  Option: "⌥",
  Shift: "⇧",
  Enter: "↵",
  Return: "↵",
  Escape: "esc",
  Esc: "esc",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Backspace: "⌫",
  Delete: "⌦",
  Tab: "⇥",
  Space: "␣",
};

/**
 * Keyboard shortcut display component
 * Renders individual keys or combinations
 */
export function Kbd({ className, keys, children, ...props }: KbdProps) {
  if (keys && keys.length > 0) {
    return (
      <span className="inline-flex items-center gap-0.5">
        {keys.map((key, i) => (
          <kbd
            key={i}
            className={cn(
              "inline-flex h-5 min-w-[20px] items-center justify-center",
              "rounded border border-white/10 bg-white/5",
              "px-1.5 text-[11px] font-medium text-text-tertiary",
              className
            )}
            {...props}
          >
            {keySymbols[key] ?? key}
          </kbd>
        ))}
      </span>
    );
  }

  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-[20px] items-center justify-center",
        "rounded border border-white/10 bg-white/5",
        "px-1.5 text-[11px] font-medium text-text-tertiary",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
