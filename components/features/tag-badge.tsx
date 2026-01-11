"use client";

import { X } from "@untitledui/icons";
import { cn } from "@/lib/cn";
import type { Tag } from "@/types/tag";
import { tagColorMap } from "@/types/tag";

interface TagBadgeProps {
  tag: Tag;
  onClick?: (tag: Tag) => void;
  onRemove?: (tag: Tag) => void;
  size?: "sm" | "md";
  removable?: boolean;
  className?: string;
}

export function TagBadge({
  tag,
  onClick,
  onRemove,
  size = "sm",
  removable = false,
  className,
}: TagBadgeProps) {
  const colorClasses = tagColorMap[tag.color] || tagColorMap.slate;

  return (
    <span
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick?.(tag)}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick(tag);
        }
      }}
      className={cn(
        "inline-flex items-center gap-1 rounded border",
        "transition-colors duration-100",
        colorClasses,
        size === "sm" && "px-1.5 py-0.5 text-[11px]",
        size === "md" && "px-2 py-0.5 text-[12px]",
        onClick && "cursor-pointer hover:bg-white/[0.08]",
        className
      )}
    >
      <span>{tag.name}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag);
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-white/20 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
