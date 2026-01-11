import type { ComponentType } from "react";

export type CommandType = "action" | "navigation" | "search" | "create";

export interface Command {
  id: string;
  label: string;
  description?: string;
  type: CommandType;
  icon?: ComponentType<{ className?: string }>;
  shortcut?: string[];
  onSelect: () => void;
  keywords?: string[];
}

export interface CommandGroup {
  id: string;
  label: string;
  commands: Command[];
}
