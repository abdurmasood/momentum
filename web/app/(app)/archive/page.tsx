"use client";

import { useState, useMemo } from "react";
import { SearchMd, RefreshCcw01 } from "@untitledui/icons";
import { ThoughtCard } from "@/components/features/thought-card";
import { mockArchivedThoughts } from "@/lib/mock-data";

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThoughts = useMemo(() => {
    if (!searchQuery) return mockArchivedThoughts;

    const query = searchQuery.toLowerCase();
    return mockArchivedThoughts.filter((thought) =>
      thought.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="p-5">
      <div className="max-w-3xl space-y-5">
        {/* Header */}
        <header className="space-y-0.5">
          <h1 className="text-[15px] font-medium text-text-primary">Archive</h1>
          <p className="text-[13px] text-text-tertiary">
            Completed and archived thoughts
          </p>
        </header>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <SearchMd className="h-4 w-4 text-text-muted" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search archive..."
            className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-muted outline-none"
          />
        </div>

        {/* Info */}
        <div className="flex items-center gap-2 text-[12px] text-text-tertiary">
          <RefreshCcw01 className="h-3.5 w-3.5" />
          <span>Archived thoughts can be restored at any time</span>
        </div>

        {/* Archived Thoughts */}
        <section className="space-y-1">
          {filteredThoughts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-[13px] text-text-tertiary">
                {searchQuery
                  ? "No archived thoughts match your search"
                  : "No archived thoughts yet"}
              </p>
            </div>
          ) : (
            filteredThoughts.map((thought) => (
              <div key={thought.id} className="opacity-60 hover:opacity-100 transition-opacity">
                <ThoughtCard thought={thought} />
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
