import {
  Inbox01,
  Folder,
  Target04,
  BookOpen01,
  Archive,
  Settings01,
  Plus,
  SearchMd,
  Moon01,
} from "@untitledui/icons";
import type { CommandGroup } from "@/types/command";

/**
 * Creates the default command groups for the command palette
 * Needs router instance passed in to handle navigation
 */
export function createDefaultCommands(
  router: { push: (path: string) => void },
  callbacks?: {
    onNewThought?: () => void;
    onToggleTheme?: () => void;
  }
): CommandGroup[] {
  return [
    {
      id: "quick-actions",
      label: "Quick Actions",
      commands: [
        {
          id: "new-thought",
          label: "New thought",
          description: "Capture to inbox",
          type: "create",
          icon: Plus,
          shortcut: ["Meta", "N"],
          keywords: ["add", "create", "write", "capture"],
          onSelect: () => callbacks?.onNewThought?.(),
        },
        {
          id: "search",
          label: "Search",
          description: "Search all thoughts",
          type: "search",
          icon: SearchMd,
          shortcut: ["Meta", "/"],
          keywords: ["find", "lookup"],
          onSelect: () => router.push("/resources?focus=search"),
        },
      ],
    },
    {
      id: "navigation",
      label: "Navigation",
      commands: [
        {
          id: "go-inbox",
          label: "Go to Inbox",
          description: "Process incoming thoughts",
          type: "navigation",
          icon: Inbox01,
          keywords: ["home", "capture", "unprocessed"],
          onSelect: () => router.push("/"),
        },
        {
          id: "go-projects",
          label: "Go to Projects",
          description: "Active projects",
          type: "navigation",
          icon: Folder,
          keywords: ["tasks", "work", "goals"],
          onSelect: () => router.push("/projects"),
        },
        {
          id: "go-areas",
          label: "Go to Areas",
          description: "Life areas and responsibilities",
          type: "navigation",
          icon: Target04,
          keywords: ["life", "responsibilities", "ongoing"],
          onSelect: () => router.push("/areas"),
        },
        {
          id: "go-resources",
          label: "Go to Resources",
          description: "Reference material",
          type: "navigation",
          icon: BookOpen01,
          keywords: ["reference", "notes", "knowledge"],
          onSelect: () => router.push("/resources"),
        },
        {
          id: "go-archive",
          label: "Go to Archive",
          description: "Archived thoughts",
          type: "navigation",
          icon: Archive,
          keywords: ["completed", "done", "old"],
          onSelect: () => router.push("/archive"),
        },
        {
          id: "go-settings",
          label: "Go to Settings",
          description: "App preferences",
          type: "navigation",
          icon: Settings01,
          keywords: ["preferences", "config"],
          onSelect: () => router.push("/settings"),
        },
      ],
    },
    {
      id: "appearance",
      label: "Appearance",
      commands: [
        {
          id: "toggle-theme",
          label: "Toggle theme",
          description: "Switch between light and dark mode",
          type: "action",
          icon: Moon01,
          keywords: ["dark", "light", "mode"],
          onSelect: () => callbacks?.onToggleTheme?.(),
        },
      ],
    },
  ];
}
