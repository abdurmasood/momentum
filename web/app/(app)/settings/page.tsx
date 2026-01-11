"use client";

import { Moon01, Monitor01, Keyboard01 } from "@untitledui/icons";
import { cn } from "@/lib/cn";
import { Kbd } from "@/components/ui/kbd";

interface ShortcutRowProps {
  keys: string[];
  description: string;
}

function ShortcutRow({ keys, description }: ShortcutRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[13px] text-text-secondary">{description}</span>
      <Kbd keys={keys} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="p-5 h-full overflow-y-auto">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <header className="space-y-0.5">
          <h1 className="text-[15px] font-medium text-text-primary">Settings</h1>
          <p className="text-[13px] text-text-tertiary">
            Manage your preferences
          </p>
        </header>

        {/* Appearance Section */}
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-[11px] font-medium text-text-muted uppercase tracking-wider">
            <Moon01 className="h-3.5 w-3.5" />
            Appearance
          </h2>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3">
            <div>
              <label className="text-[12px] text-text-tertiary">Theme</label>
              <div className="flex gap-2 mt-2">
                {(["dark", "light", "system"] as const).map((option) => (
                  <button
                    key={option}
                    disabled={option !== "dark"}
                    className={cn(
                      "px-3 py-1.5 rounded text-[12px] capitalize",
                      "border border-white/[0.06] transition-colors",
                      option === "dark"
                        ? "bg-white/[0.08] text-text-primary border-white/[0.12]"
                        : "text-text-muted cursor-not-allowed opacity-50"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-text-muted mt-2">
                Light and system themes coming soon
              </p>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-[11px] font-medium text-text-muted uppercase tracking-wider">
            <Monitor01 className="h-3.5 w-3.5" />
            Preferences
          </h2>

          <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] divide-y divide-white/[0.04]">
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="text-[13px] text-text-primary">Default view</p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Choose list or grid for thoughts
                </p>
              </div>
              <select className="bg-white/[0.04] border border-white/[0.06] rounded px-2 py-1 text-[12px] text-text-secondary">
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3">
              <div>
                <p className="text-[13px] text-text-primary">Week starts on</p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  First day of the week in planner
                </p>
              </div>
              <select className="bg-white/[0.04] border border-white/[0.06] rounded px-2 py-1 text-[12px] text-text-secondary">
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
              </select>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts Section */}
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-[11px] font-medium text-text-muted uppercase tracking-wider">
            <Keyboard01 className="h-3.5 w-3.5" />
            Keyboard Shortcuts
          </h2>

          <div className="px-3 rounded-lg bg-white/[0.02] border border-white/[0.06] divide-y divide-white/[0.04]">
            <ShortcutRow keys={["⌘", "K"]} description="Open command palette" />
            <ShortcutRow keys={["⌘", "N"]} description="New thought" />
            <ShortcutRow keys={["⌘", "/"]} description="Search" />
            <ShortcutRow keys={["Esc"]} description="Close modal" />
          </div>
        </section>

        {/* About */}
        <section className="pt-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                background: `
                  radial-gradient(
                    ellipse at 25% 25%,
                    #FFF8E7 0%,
                    #F5E6A3 10%,
                    #E8D48B 20%,
                    #D4AF37 35%,
                    #C9A227 50%,
                    #B8942A 65%,
                    #9A7B22 80%,
                    #7D631C 100%
                  )
                `,
                boxShadow: `
                  0 6px 12px rgba(0, 0, 0, 0.5),
                  0 3px 6px rgba(0, 0, 0, 0.4),
                  inset 0 2px 4px rgba(255, 250, 230, 0.7),
                  inset 0 -2px 4px rgba(80, 60, 20, 0.5),
                  inset 2px 0 3px rgba(255, 248, 220, 0.4),
                  inset -2px 0 3px rgba(100, 75, 25, 0.4)
                `,
                transform: 'translateZ(0)'
              }}
            >
              <span
                className="text-[11px] font-bold"
                style={{
                  color: '#4A3C1F',
                  textShadow: '0 1px 0 rgba(255, 250, 230, 0.5), 0 -0.5px 0 rgba(60, 45, 15, 0.3)'
                }}
              >M</span>
            </div>
            <div>
              <p className="text-[13px] font-medium text-text-primary">Momentum</p>
              <p className="text-[11px] text-text-muted">
                Version 0.1.0
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
