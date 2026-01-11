"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Plus } from "@untitledui/icons";
import { cn } from "@/lib/cn";

interface QuickCaptureProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function QuickCapture({
  onSubmit,
  placeholder = "What's on your mind?",
  autoFocus = false,
  className,
}: QuickCaptureProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setContent("");
      inputRef.current?.blur();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-3 py-2.5 rounded-lg",
        "bg-white/[0.02] border border-white/[0.06]",
        "transition-colors duration-100",
        isFocused && "border-white/[0.12] bg-white/[0.03]",
        className
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded bg-accent-purple/10 mt-0.5">
        <Plus className="h-3 w-3 text-accent-purple" />
      </div>

      <div className="flex-1 min-w-0">
        <textarea
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={1}
          className={cn(
            "w-full bg-transparent text-[13px] resize-none",
            "text-text-primary placeholder:text-text-muted",
            "outline-none"
          )}
        />

        {/* Action hints */}
        {isFocused && content.trim() && (
          <div className="flex items-center justify-end mt-2 pt-2 border-t border-white/[0.04]">
            <button
              onClick={handleSubmit}
              className={cn(
                "px-2.5 py-1 rounded text-[12px] font-medium",
                "bg-accent-purple text-white",
                "hover:bg-accent-purple/90 transition-colors"
              )}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
