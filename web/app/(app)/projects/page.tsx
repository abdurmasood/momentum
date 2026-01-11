"use client";

import Link from "next/link";
import { Folder, Plus, ArrowRight } from "@untitledui/icons";
import { cn } from "@/lib/cn";
import { mockProjects } from "@/lib/mock-data";
import type { Project } from "@/types/project";

export default function ProjectsPage() {
  const activeProjects = mockProjects.filter((p) => p.status === "active");
  const otherProjects = mockProjects.filter((p) => p.status !== "active");

  return (
    <div className="p-5">
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-text-muted" />
              <h1 className="text-[15px] font-medium text-text-primary">Projects</h1>
            </div>
            <p className="text-[13px] text-text-tertiary">
              Short-term efforts with specific goals
            </p>
          </div>
          <button
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md",
              "text-[12px] font-medium",
              "bg-accent-purple text-white",
              "hover:bg-accent-purple/90 transition-colors"
            )}
          >
            <Plus className="h-3.5 w-3.5" />
            New project
          </button>
        </header>

        {/* Active Projects */}
        {activeProjects.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
              Active ({activeProjects.length})
            </h2>
            <div className="space-y-1">
              {activeProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
              On hold / Completed
            </h2>
            <div className="space-y-1">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {mockProjects.length === 0 && (
          <div className="py-12 text-center">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-white/[0.04] mb-3">
              <Folder className="h-5 w-5 text-text-muted" />
            </div>
            <p className="text-[13px] text-text-secondary mb-1">No projects yet</p>
            <p className="text-[12px] text-text-muted">
              Create your first project to organize related thoughts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const statusColors = {
    active: "bg-accent-emerald/20 text-accent-emerald",
    "on-hold": "bg-amber-500/20 text-amber-400",
    completed: "bg-white/[0.08] text-text-muted",
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg",
        "bg-white/[0.02] border border-white/[0.04]",
        "hover:bg-white/[0.04] transition-colors group"
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-purple/10">
        <Folder className="h-4 w-4 text-accent-purple" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-medium text-text-primary truncate">
            {project.name}
          </p>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-medium",
              statusColors[project.status]
            )}
          >
            {project.status}
          </span>
        </div>
        {project.description && (
          <p className="text-[12px] text-text-muted truncate mt-0.5">
            {project.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[12px] text-text-muted">
          {project.thoughtCount} thought{project.thoughtCount !== 1 ? "s" : ""}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
