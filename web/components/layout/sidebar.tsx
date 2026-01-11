"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox01,
  Folder,
  Target04,
  BookOpen01,
  Archive,
  Settings01,
  SearchMd,
  ChevronRight,
  Plus,
  Home05,
} from "@untitledui/icons";
import { cn } from "@/lib/cn";
import { mockProjects, mockAreas, getInboxThoughts } from "@/lib/mock-data";

export function Sidebar() {
  const pathname = usePathname();
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [areasExpanded, setAreasExpanded] = useState(true);

  const inboxCount = getInboxThoughts().length;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-[240px]",
        "flex flex-col",
        "bg-[#09090b]"
      )}
    >
      {/* Header */}
      <div className="flex h-12 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Home05 className="h-5 w-5 text-text-secondary opacity-70" />
        </Link>
        <button className="p-1 text-text-tertiary hover:text-text-secondary transition-colors">
          <SearchMd className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {/* Inbox */}
        <Link
          href="/"
          className={cn(
            "flex items-center justify-between rounded-md px-2 py-1.5",
            "transition-colors duration-100",
            "hover:bg-white/[0.08]",
            pathname === "/"
              ? "bg-white/[0.06] text-text-primary"
              : "text-text-secondary"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Inbox01 className="h-4 w-4 shrink-0 opacity-70" />
            <span className="text-[13px]">Inbox</span>
          </div>
          {inboxCount > 0 && (
            <span className="text-[11px] text-text-muted">{inboxCount}</span>
          )}
        </Link>

        {/* ORGANIZE Section */}
        <div className="pt-4">
          <div className="px-2 pb-1.5">
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
              Organize
            </span>
          </div>

          {/* Projects */}
          <div>
            <button
              onClick={() => setProjectsExpanded(!projectsExpanded)}
              className={cn(
                "flex items-center justify-between w-full rounded-md px-2 py-1.5",
                "transition-colors duration-100",
                "hover:bg-white/[0.08]",
                pathname.startsWith("/projects")
                  ? "text-text-primary"
                  : "text-text-secondary"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Folder className="h-4 w-4 shrink-0 opacity-70" />
                <span className="text-[13px]">Projects</span>
              </div>
              <ChevronRight
                className={cn(
                  "h-3 w-3 text-text-muted transition-transform",
                  projectsExpanded && "rotate-90"
                )}
              />
            </button>
            {projectsExpanded && (
              <div className="ml-4 pl-2.5 border-l border-white/[0.06] space-y-0.5 mt-0.5">
                {mockProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1",
                      "transition-colors duration-100",
                      "hover:bg-white/[0.08]",
                      pathname === `/projects/${project.id}`
                        ? "text-text-primary"
                        : "text-text-muted"
                    )}
                  >
                    <span className="text-[12px] truncate">{project.name}</span>
                    <span className="text-[10px] text-text-muted">
                      {project.thoughtCount}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/projects"
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1",
                    "transition-colors duration-100",
                    "hover:bg-white/[0.08] text-text-muted hover:text-text-secondary"
                  )}
                >
                  <Plus className="h-3 w-3" />
                  <span className="text-[11px]">View all</span>
                </Link>
              </div>
            )}
          </div>

          {/* Areas */}
          <div className="mt-0.5">
            <button
              onClick={() => setAreasExpanded(!areasExpanded)}
              className={cn(
                "flex items-center justify-between w-full rounded-md px-2 py-1.5",
                "transition-colors duration-100",
                "hover:bg-white/[0.08]",
                pathname.startsWith("/areas")
                  ? "text-text-primary"
                  : "text-text-secondary"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Target04 className="h-4 w-4 shrink-0 opacity-70" />
                <span className="text-[13px]">Areas</span>
              </div>
              <ChevronRight
                className={cn(
                  "h-3 w-3 text-text-muted transition-transform",
                  areasExpanded && "rotate-90"
                )}
              />
            </button>
            {areasExpanded && (
              <div className="ml-4 pl-2.5 border-l border-white/[0.06] space-y-0.5 mt-0.5">
                {mockAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/areas/${area.id}`}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1",
                      "transition-colors duration-100",
                      "hover:bg-white/[0.08]",
                      pathname === `/areas/${area.id}`
                        ? "text-text-primary"
                        : "text-text-muted"
                    )}
                  >
                    <span className="text-[12px] truncate">
                      {area.icon && <span className="mr-1.5">{area.icon}</span>}
                      {area.name}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {area.thoughtCount}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/areas"
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1",
                    "transition-colors duration-100",
                    "hover:bg-white/[0.08] text-text-muted hover:text-text-secondary"
                  )}
                >
                  <Plus className="h-3 w-3" />
                  <span className="text-[11px]">View all</span>
                </Link>
              </div>
            )}
          </div>

          {/* Resources */}
          <Link
            href="/resources"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2 py-1.5 mt-0.5",
              "transition-colors duration-100",
              "hover:bg-white/[0.08]",
              pathname === "/resources"
                ? "bg-white/[0.06] text-text-primary"
                : "text-text-secondary"
            )}
          >
            <BookOpen01 className="h-4 w-4 shrink-0 opacity-70" />
            <span className="text-[13px]">Resources</span>
          </Link>

          {/* Archive */}
          <Link
            href="/archive"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2 py-1.5 mt-0.5",
              "transition-colors duration-100",
              "hover:bg-white/[0.08]",
              pathname === "/archive"
                ? "bg-white/[0.06] text-text-primary"
                : "text-text-secondary"
            )}
          >
            <Archive className="h-4 w-4 shrink-0 opacity-70" />
            <span className="text-[13px]">Archive</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-md px-2 py-1.5",
            "transition-colors duration-100",
            "hover:bg-white/[0.08]",
            pathname === "/settings"
              ? "bg-white/[0.06] text-text-primary"
              : "text-text-secondary"
          )}
        >
          <Settings01 className="h-4 w-4 shrink-0 opacity-70" />
          <span className="text-[13px]">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
