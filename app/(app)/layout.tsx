"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { CommandPalette } from "@/components/features/command-palette";
import { CommandPaletteProvider } from "@/hooks/use-command-palette";
import { createDefaultCommands } from "@/lib/commands";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Create commands with router
  const commands = useMemo(
    () =>
      createDefaultCommands(router, {
        onNewThought: () => {
          console.log("New thought");
        },
        onToggleTheme: () => {
          console.log("Toggle theme");
        },
      }),
    [router]
  );

  return (
    <CommandPaletteProvider groups={commands}>
      <div className="flex h-screen bg-[#09090b] overflow-hidden overscroll-none fixed inset-0">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 ml-[240px] p-2 pr-2 pt-2 pb-2">
          {/* Inner container - rounded panel like Linear */}
          <div className="h-[calc(100vh-16px)] bg-[#121214] rounded-lg border border-white/[0.06] overflow-hidden">
            {children}
          </div>
        </main>

        {/* Command Palette */}
        <CommandPalette />
      </div>
    </CommandPaletteProvider>
  );
}
