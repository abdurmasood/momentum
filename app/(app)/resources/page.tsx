"use client";

import { useState, useMemo } from "react";
import { BookOpen01, SearchMd } from "@untitledui/icons";
import { ThoughtCard } from "@/components/features/thought-card";
import { getResourceThoughts } from "@/lib/mock-data";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const resourceThoughts = getResourceThoughts();

  const filteredThoughts = useMemo(() => {
    if (!searchQuery) return resourceThoughts;

    const query = searchQuery.toLowerCase();
    return resourceThoughts.filter((thought) =>
      thought.content.toLowerCase().includes(query)
    );
  }, [searchQuery, resourceThoughts]);

  return (
    <div className="p-5">
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <header className="space-y-0.5">
          <div className="flex items-center gap-2">
            <BookOpen01 className="h-4 w-4 text-text-muted" />
            <h1 className="text-[15px] font-medium text-text-primary">Resources</h1>
          </div>
          <p className="text-[13px] text-text-tertiary">
            Reference material for future use
          </p>
        </header>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <SearchMd className="h-4 w-4 text-text-muted" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-muted outline-none"
          />
        </div>

        {/* Resources List */}
        <section className="space-y-2">
          <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
            {searchQuery
              ? `Results (${filteredThoughts.length})`
              : `All resources (${resourceThoughts.length})`}
          </h2>
          {filteredThoughts.length > 0 ? (
            <div className="space-y-1">
              {filteredThoughts.map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-white/[0.04] mb-3">
                <BookOpen01 className="h-5 w-5 text-text-muted" />
              </div>
              <p className="text-[13px] text-text-secondary mb-1">
                {searchQuery ? "No results found" : "No resources yet"}
              </p>
              <p className="text-[12px] text-text-muted">
                {searchQuery
                  ? "Try a different search term"
                  : "Move thoughts here from your inbox as reference material"}
              </p>
            </div>
          )}
        </section>

        {/* Info */}
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <p className="text-[12px] text-text-muted">
            <span className="text-text-secondary font-medium">Tip:</span> Resources
            are for reference material that doesn&apos;t belong to a specific project
            or area — like code snippets, design principles, or useful links.
          </p>
        </div>
      </div>
    </div>
  );
}
