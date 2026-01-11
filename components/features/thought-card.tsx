"use client";

import {
  DotsHorizontal,
  Pin01,
  Archive,
  Trash01,
  Folder,
  Target04,
  BookOpen01,
  ChevronRight,
} from "@untitledui/icons";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/cn";
import { TagBadge } from "./tag-badge";
import { mockProjects, mockAreas } from "@/lib/mock-data";
import type { Thought } from "@/types/thought";
import type { Tag } from "@/types/tag";

interface ThoughtCardProps {
  thought: Thought;
  onTagClick?: (tag: Tag) => void;
  onEdit?: (thought: Thought) => void;
  onDelete?: (thought: Thought) => void;
  onPin?: (thought: Thought) => void;
  onArchive?: (thought: Thought) => void;
  onMoveToProject?: (thought: Thought, projectId: string) => void;
  onMoveToArea?: (thought: Thought, areaId: string) => void;
  onMoveToResource?: (thought: Thought) => void;
  showProcessingActions?: boolean;
  className?: string;
}

export function ThoughtCard({
  thought,
  onTagClick,
  onEdit,
  onDelete,
  onPin,
  onArchive,
  onMoveToProject,
  onMoveToArea,
  onMoveToResource,
  showProcessingActions = false,
  className,
}: ThoughtCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProjectSubmenu, setShowProjectSubmenu] = useState(false);
  const [showAreaSubmenu, setShowAreaSubmenu] = useState(false);

  return (
    <div
      onClick={() => onEdit?.(thought)}
      className={cn(
        "group flex flex-col gap-2 px-3 py-2.5 rounded-lg cursor-pointer",
        "bg-white/[0.02] border border-white/[0.04]",
        "hover:bg-white/[0.03] transition-colors duration-100",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Pin indicator */}
          {thought.isPinned && (
            <div className="flex items-center gap-1 text-accent-purple text-[11px] mb-1">
              <Pin01 className="h-3 w-3" />
              <span>Pinned</span>
            </div>
          )}

          {/* Thought content */}
          <p className="text-[13px] text-text-primary line-clamp-2">
            {thought.content}
          </p>

          {/* Summary if exists */}
          {thought.summary && (
            <p className="text-[12px] text-text-muted mt-1 italic">
              {thought.summary}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-2 mt-1.5">
            {/* Tags */}
            {thought.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {thought.tags.slice(0, 2).map((tag) => (
                  <TagBadge
                    key={tag.id}
                    tag={tag}
                    onClick={onTagClick}
                    size="sm"
                  />
                ))}
                {thought.tags.length > 2 && (
                  <span className="text-[11px] text-text-muted">
                    +{thought.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Timestamp */}
            <span className="text-[11px] text-text-muted">
              {formatDistanceToNow(new Date(thought.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        {/* Actions menu */}
        <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className={cn(
              "p-1 rounded transition-colors",
              "text-text-muted hover:text-text-secondary",
              "hover:bg-white/[0.04]"
            )}
          >
            <DotsHorizontal className="h-4 w-4" />
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  setShowProjectSubmenu(false);
                  setShowAreaSubmenu(false);
                }}
              />
              <div
                className={cn(
                  "absolute right-0 top-full mt-1 z-20",
                  "w-44 py-1 rounded-lg",
                  "bg-[#1a1a1c] border border-white/[0.08] shadow-xl"
                )}
              >
                {/* Move to Project */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowProjectSubmenu(!showProjectSubmenu);
                      setShowAreaSubmenu(false);
                    }}
                    className="flex items-center justify-between gap-2 w-full px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="h-3.5 w-3.5" />
                      Move to Project
                    </div>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                  {showProjectSubmenu && (
                    <div className="absolute left-full top-0 ml-1 w-40 py-1 rounded-lg bg-[#1a1a1c] border border-white/[0.08] shadow-xl">
                      {mockProjects.map((project) => (
                        <button
                          key={project.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveToProject?.(thought, project.id);
                            setShowMenu(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-[12px] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                        >
                          {project.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Move to Area */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAreaSubmenu(!showAreaSubmenu);
                      setShowProjectSubmenu(false);
                    }}
                    className="flex items-center justify-between gap-2 w-full px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      <Target04 className="h-3.5 w-3.5" />
                      Move to Area
                    </div>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                  {showAreaSubmenu && (
                    <div className="absolute left-full top-0 ml-1 w-40 py-1 rounded-lg bg-[#1a1a1c] border border-white/[0.08] shadow-xl">
                      {mockAreas.map((area) => (
                        <button
                          key={area.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveToArea?.(thought, area.id);
                            setShowMenu(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-[12px] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                        >
                          {area.icon && <span>{area.icon}</span>}
                          {area.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Move to Resources */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveToResource?.(thought);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                >
                  <BookOpen01 className="h-3.5 w-3.5" />
                  Move to Resources
                </button>

                <div className="my-1 border-t border-white/[0.06]" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPin?.(thought);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                >
                  <Pin01 className="h-3.5 w-3.5" />
                  {thought.isPinned ? "Unpin" : "Pin"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive?.(thought);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                >
                  <Archive className="h-3.5 w-3.5" />
                  Archive
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(thought);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-red-400 hover:text-red-300 hover:bg-white/[0.04]"
                >
                  <Trash01 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Processing actions (inline buttons for inbox) */}
      {showProcessingActions && (
        <div className="flex items-center gap-1.5 pt-1 border-t border-white/[0.04]">
          <span className="text-[11px] text-text-muted mr-1">Move to:</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowProjectSubmenu(true);
              setShowMenu(true);
            }}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded",
              "text-[11px] text-text-muted",
              "bg-white/[0.04] hover:bg-white/[0.06] hover:text-text-secondary",
              "transition-colors"
            )}
          >
            <Folder className="h-3 w-3" />
            Project
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAreaSubmenu(true);
              setShowMenu(true);
            }}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded",
              "text-[11px] text-text-muted",
              "bg-white/[0.04] hover:bg-white/[0.06] hover:text-text-secondary",
              "transition-colors"
            )}
          >
            <Target04 className="h-3 w-3" />
            Area
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveToResource?.(thought);
            }}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded",
              "text-[11px] text-text-muted",
              "bg-white/[0.04] hover:bg-white/[0.06] hover:text-text-secondary",
              "transition-colors"
            )}
          >
            <BookOpen01 className="h-3 w-3" />
            Resource
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onArchive?.(thought);
            }}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded",
              "text-[11px] text-text-muted",
              "bg-white/[0.04] hover:bg-white/[0.06] hover:text-text-secondary",
              "transition-colors"
            )}
          >
            <Archive className="h-3 w-3" />
            Archive
          </button>
        </div>
      )}
    </div>
  );
}
