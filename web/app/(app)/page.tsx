"use client";

import { useState, useEffect } from "react";
import {
  Inbox01,
  Folder,
  Target04,
  BookOpen01,
  Archive,
  Trash01,
  DotsHorizontal,
  FilterLines,
  SwitchVertical01,
} from "@untitledui/icons";
import { formatDistanceToNow, format } from "date-fns";
import { cn } from "@/lib/cn";
import { getInboxThoughts, mockProjects, mockAreas } from "@/lib/mock-data";
import { TagBadge } from "@/components/features/tag-badge";
import type { Thought } from "@/types/thought";

export default function InboxPage() {
  const inboxThoughts = getInboxThoughts();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedThought = inboxThoughts.find((t) => t.id === selectedId);

  return (
    <div className="flex h-full">
      {/* Left Panel - List */}
      <div className="w-[420px] border-r border-white/[0.06] flex flex-col">
        <header className="flex items-center justify-between px-4 h-11 shrink-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[13px] font-medium text-text-primary">Inbox</h1>
            <button className="p-1 rounded hover:bg-white/[0.06] text-text-muted transition-colors">
              <DotsHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="p-1.5 rounded hover:bg-white/[0.06] text-text-muted transition-colors">
              <FilterLines className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-white/[0.06] text-text-muted transition-colors">
              <SwitchVertical01 className="h-4 w-4" />
            </button>
          </div>
        </header>

        {inboxThoughts.length > 0 ? (
          <div className="flex-1 overflow-y-auto">
            {inboxThoughts.map((thought) => (
              <InboxListItem
                key={thought.id}
                thought={thought}
                isSelected={thought.id === selectedId}
                onClick={() => setSelectedId(thought.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Right Panel - Detail */}
      <div className="flex-1 flex flex-col">
        {selectedThought ? (
          <InboxDetail thought={selectedThought} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex h-32 w-32 items-center justify-center mb-5">
              <svg
                width="130"
                height="130"
                viewBox="0 0 80 80"
                fill="none"
                className="text-white/90"
              >
                <rect
                  x="12"
                  y="20"
                  width="56"
                  height="44"
                  rx="8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M12 44h18c2 0 3.5 1.5 5 4s3 4 5 4s3.5-1.5 5-4s3-4 5-4h18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>
            <p className="text-[15px] text-white/80">No unread thoughts</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InboxListItem({
  thought,
  isSelected,
  onClick,
}: {
  thought: Thought;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [shortTime, setShortTime] = useState("");

  useEffect(() => {
    const timeAgo = formatDistanceToNow(new Date(thought.createdAt), {
      addSuffix: false,
    });
    // Shorten time display like Linear (5w, 2d, 3h)
    const formatted = timeAgo
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" days", "d")
      .replace(" day", "d")
      .replace(" weeks", "w")
      .replace(" week", "w")
      .replace(" months", "mo")
      .replace(" month", "mo")
      .replace("about ", "")
      .replace("less than a", "<1");
    setShortTime(formatted);
  }, [thought.createdAt]);

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors",
        isSelected ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
      )}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08] shrink-0">
        <Inbox01 className="h-3.5 w-3.5 text-text-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#6a6a78] truncate">
          {thought.content}
        </p>
        <p className="text-[12px] text-[#6a6a78] truncate mt-0.5">
          Captured thought
        </p>
      </div>
      <span className="text-[12px] text-[#6a6a78] shrink-0">{shortTime}</span>
    </div>
  );
}

function InboxDetail({ thought }: { thought: Thought }) {
  return (
    <>
      {/* Detail Header */}
      <header className="flex items-center justify-between px-5 h-11 border-b border-white/[0.04] shrink-0">
        <span className="text-[11px] text-text-muted">
          {format(new Date(thought.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </span>
      </header>

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-[14px] text-text-primary leading-relaxed">
          {thought.content}
        </p>

        {/* Tags */}
        {thought.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {thought.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} size="sm" />
            ))}
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="border-t border-white/[0.04] p-4 shrink-0">
        <p className="text-[11px] text-text-muted uppercase tracking-wider mb-3">
          Move to
        </p>
        <div className="space-y-1">
          {/* Projects */}
          {mockProjects.map((project) => (
            <button
              key={project.id}
              className={cn(
                "flex items-center gap-2.5 w-full px-3 py-2 rounded-md",
                "text-[13px] text-text-secondary",
                "hover:bg-white/[0.04] hover:text-text-primary transition-colors"
              )}
            >
              <Folder className="h-4 w-4 text-text-muted" />
              {project.name}
            </button>
          ))}

          {/* Areas */}
          {mockAreas.map((area) => (
            <button
              key={area.id}
              className={cn(
                "flex items-center gap-2.5 w-full px-3 py-2 rounded-md",
                "text-[13px] text-text-secondary",
                "hover:bg-white/[0.04] hover:text-text-primary transition-colors"
              )}
            >
              <Target04 className="h-4 w-4 text-text-muted" />
              {area.icon && <span className="text-sm">{area.icon}</span>}
              {area.name}
            </button>
          ))}

          <div className="border-t border-white/[0.04] my-2" />

          {/* Resources */}
          <button
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-2 rounded-md",
              "text-[13px] text-text-secondary",
              "hover:bg-white/[0.04] hover:text-text-primary transition-colors"
            )}
          >
            <BookOpen01 className="h-4 w-4 text-text-muted" />
            Resources
          </button>

          {/* Archive */}
          <button
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-2 rounded-md",
              "text-[13px] text-text-secondary",
              "hover:bg-white/[0.04] hover:text-text-primary transition-colors"
            )}
          >
            <Archive className="h-4 w-4 text-text-muted" />
            Archive
          </button>

          {/* Delete */}
          <button
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-2 rounded-md",
              "text-[13px] text-red-400",
              "hover:bg-red-500/10 transition-colors"
            )}
          >
            <Trash01 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
