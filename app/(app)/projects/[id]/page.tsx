"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Folder, DotsHorizontal } from "@untitledui/icons";
import { cn } from "@/lib/cn";
import { QuickCapture } from "@/components/features/quick-capture";
import { ThoughtCard } from "@/components/features/thought-card";
import { mockProjects, getProjectThoughts } from "@/lib/mock-data";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = use(params);
  const project = mockProjects.find((p) => p.id === id);
  const thoughts = getProjectThoughts(id);

  if (!project) {
    return (
      <div className="p-5">
        <div className="max-w-3xl">
          <p className="text-[13px] text-text-muted">Project not found</p>
          <Link
            href="/projects"
            className="text-[13px] text-accent-purple hover:text-accent-blue transition-colors"
          >
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    active: "bg-accent-emerald/20 text-accent-emerald",
    "on-hold": "bg-amber-500/20 text-amber-400",
    completed: "bg-white/[0.08] text-text-muted",
  };

  const handleNewThought = (content: string) => {
    console.log("New thought for project:", project.id, content);
  };

  return (
    <div className="p-5">
      <div className="max-w-3xl space-y-6">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-[12px] text-text-muted hover:text-text-secondary transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        {/* Header */}
        <header className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/10 mt-0.5">
              <Folder className="h-5 w-5 text-accent-purple" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-medium text-text-primary">
                  {project.name}
                </h1>
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
                <p className="text-[13px] text-text-tertiary mt-0.5">
                  {project.description}
                </p>
              )}
            </div>
          </div>
          <button className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted transition-colors">
            <DotsHorizontal className="h-4 w-4" />
          </button>
        </header>

        {/* Quick Capture for this project */}
        <QuickCapture
          onSubmit={handleNewThought}
          placeholder={`Add thought to ${project.name}...`}
        />

        {/* Thoughts */}
        <section className="space-y-2">
          <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
            Thoughts ({thoughts.length})
          </h2>
          {thoughts.length > 0 ? (
            <div className="space-y-1">
              {thoughts.map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-[13px] text-text-muted">
                No thoughts in this project yet
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
