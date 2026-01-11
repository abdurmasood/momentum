"use client";

import { useRef, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { SearchMd } from "@untitledui/icons";
import { cn } from "@/lib/cn";
import { variants } from "@/lib/motion";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { Kbd } from "@/components/ui/kbd";

export function CommandPalette() {
  const {
    isOpen,
    close,
    query,
    setQuery,
    filteredGroups,
    selectedIndex,
    setSelectedIndex,
    selectCommand,
    navigateUp,
    navigateDown,
    selectCurrent,
    flatCommands,
  } = useCommandPalette();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        navigateUp();
        break;
      case "ArrowDown":
        e.preventDefault();
        navigateDown();
        break;
      case "Enter":
        e.preventDefault();
        selectCurrent();
        break;
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            variants={variants.overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            className="fixed inset-0 z-[500] bg-black/70"
          />

          {/* Palette Container */}
          <div className="fixed inset-0 z-[500] flex items-start justify-center pt-[20vh]">
            <m.div
              variants={variants.commandPalette}
              initial="hidden"
              animate="visible"
              exit="exit"
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full max-w-[520px] overflow-hidden rounded-lg",
                "bg-[#18181b] shadow-2xl shadow-black/50",
                "border border-white/[0.08]"
              )}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-3">
                <SearchMd className="h-4 w-4 text-text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className={cn(
                    "flex-1 bg-transparent py-3 text-[13px]",
                    "text-text-primary placeholder:text-text-muted",
                    "outline-none"
                  )}
                />
                <Kbd keys={["Esc"]} />
              </div>

              {/* Command List */}
              <div className="max-h-72 overflow-auto py-1">
                {filteredGroups.length === 0 ? (
                  <div className="px-3 py-6 text-center text-[13px] text-text-muted">
                    No commands found
                  </div>
                ) : (
                  filteredGroups.map((group) => (
                    <div key={group.id}>
                      <div className="px-3 py-1.5">
                        <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                          {group.label}
                        </span>
                      </div>
                      {group.commands.map((command) => {
                        const globalIndex = flatCommands.indexOf(command);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = command.icon;

                        return (
                          <button
                            key={command.id}
                            onClick={() => selectCommand(command)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={cn(
                              "flex w-full items-center gap-2.5 px-3 py-2",
                              "text-left transition-colors",
                              isSelected
                                ? "bg-white/[0.08] text-text-primary"
                                : "text-text-secondary hover:bg-white/[0.04]"
                            )}
                          >
                            {Icon && (
                              <Icon className="h-4 w-4 text-text-muted" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] truncate">
                                {command.label}
                              </div>
                              {command.description && (
                                <div className="text-[11px] text-text-muted truncate">
                                  {command.description}
                                </div>
                              )}
                            </div>
                            {command.shortcut && (
                              <Kbd keys={command.shortcut} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-1.5">
                <div className="flex items-center gap-3 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <Kbd keys={["↑"]} />
                    <Kbd keys={["↓"]} />
                    <span>navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Kbd keys={["↵"]} />
                    <span>select</span>
                  </span>
                </div>
              </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
