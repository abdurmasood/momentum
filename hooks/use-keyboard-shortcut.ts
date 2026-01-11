"use client";

import { useEffect, useCallback } from "react";

type Key =
  | "Meta"
  | "Control"
  | "Alt"
  | "Shift"
  | "Escape"
  | "Enter"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | string;

interface Options {
  enabled?: boolean;
  preventDefault?: boolean;
}

/**
 * Hook to register global keyboard shortcuts
 */
export function useKeyboardShortcut(
  keys: Key[],
  callback: () => void,
  options: Options = {}
) {
  const { enabled = true, preventDefault = true } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const modifiers = {
        Meta: event.metaKey,
        Control: event.ctrlKey,
        Alt: event.altKey,
        Shift: event.shiftKey,
      };

      const allKeysPressed = keys.every((key) => {
        if (key in modifiers) {
          return modifiers[key as keyof typeof modifiers];
        }
        return event.key.toLowerCase() === key.toLowerCase();
      });

      if (allKeysPressed) {
        if (preventDefault) event.preventDefault();
        callback();
      }
    },
    [keys, callback, enabled, preventDefault]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
