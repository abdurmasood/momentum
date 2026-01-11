"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Target04, DotsHorizontal } from "@untitledui/icons";
import { QuickCapture } from "@/components/features/quick-capture";
import { ThoughtCard } from "@/components/features/thought-card";
import { mockAreas, getAreaThoughts } from "@/lib/mock-data";

interface AreaDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AreaDetailPage({ params }: AreaDetailPageProps) {
  const { id } = use(params);
  const area = mockAreas.find((a) => a.id === id);
  const thoughts = getAreaThoughts(id);

  if (!area) {
    return (
      <div className="p-5">
        <div className="max-w-3xl">
          <p className="text-[13px] text-text-muted">Area not found</p>
          <Link
            href="/areas"
            className="text-[13px] text-accent-purple hover:text-accent-blue transition-colors"
          >
            ← Back to areas
          </Link>
        </div>
      </div>
    );
  }

  const handleNewThought = (content: string) => {
    console.log("New thought for area:", area.id, content);
  };

  return (
    <div className="p-5">
      <div className="max-w-3xl space-y-6">
        {/* Back link */}
        <Link
          href="/areas"
          className="inline-flex items-center gap-1 text-[12px] text-text-muted hover:text-text-secondary transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Areas
        </Link>

        {/* Header */}
        <header className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10 mt-0.5">
              {area.icon ? (
                <span className="text-xl">{area.icon}</span>
              ) : (
                <Target04 className="h-5 w-5 text-accent-blue" />
              )}
            </div>
            <div>
              <h1 className="text-[15px] font-medium text-text-primary">
                {area.name}
              </h1>
              {area.description && (
                <p className="text-[13px] text-text-tertiary mt-0.5">
                  {area.description}
                </p>
              )}
            </div>
          </div>
          <button className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted transition-colors">
            <DotsHorizontal className="h-4 w-4" />
          </button>
        </header>

        {/* Quick Capture for this area */}
        <QuickCapture
          onSubmit={handleNewThought}
          placeholder={`Add thought to ${area.name}...`}
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
                No thoughts in this area yet
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
