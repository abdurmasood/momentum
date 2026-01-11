"use client";

import Link from "next/link";
import { Target04, Plus, ArrowRight } from "@untitledui/icons";
import { cn } from "@/lib/cn";
import { mockAreas } from "@/lib/mock-data";
import type { Area } from "@/types/area";

export default function AreasPage() {
  return (
    <div className="p-5">
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Target04 className="h-4 w-4 text-text-muted" />
              <h1 className="text-[15px] font-medium text-text-primary">Areas</h1>
            </div>
            <p className="text-[13px] text-text-tertiary">
              Long-term responsibilities and life areas
            </p>
          </div>
          <button
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md",
              "text-[12px] font-medium",
              "bg-accent-blue text-white",
              "hover:bg-accent-blue/90 transition-colors"
            )}
          >
            <Plus className="h-3.5 w-3.5" />
            New area
          </button>
        </header>

        {/* Areas Grid */}
        {mockAreas.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
              Your areas ({mockAreas.length})
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {mockAreas.map((area) => (
                <AreaCard key={area.id} area={area} />
              ))}
            </div>
          </section>
        ) : (
          <div className="py-12 text-center">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-white/[0.04] mb-3">
              <Target04 className="h-5 w-5 text-text-muted" />
            </div>
            <p className="text-[13px] text-text-secondary mb-1">No areas yet</p>
            <p className="text-[12px] text-text-muted">
              Create areas to organize thoughts by life responsibility
            </p>
          </div>
        )}

        {/* Info */}
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <p className="text-[12px] text-text-muted">
            <span className="text-text-secondary font-medium">Tip:</span> Areas
            are different from projects. They represent ongoing responsibilities
            that don&apos;t have an end date — like Health, Career, or Family.
          </p>
        </div>
      </div>
    </div>
  );
}

function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas/${area.id}`}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg",
        "bg-white/[0.02] border border-white/[0.04]",
        "hover:bg-white/[0.04] transition-colors group"
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10">
        {area.icon ? (
          <span className="text-lg">{area.icon}</span>
        ) : (
          <Target04 className="h-5 w-5 text-accent-blue" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-text-primary truncate">
          {area.name}
        </p>
        {area.description && (
          <p className="text-[11px] text-text-muted truncate">
            {area.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-text-muted">
          {area.thoughtCount}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
