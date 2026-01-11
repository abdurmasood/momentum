"use client";

import { useState, useCallback, useMemo, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useKeyboardShortcut } from "./use-keyboard-shortcut";
import type { Command, CommandGroup } from "@/types/command";

interface CommandPaletteState {
  isOpen: boolean;
  query: string;
  selectedIndex: number;
}

interface CommandPaletteActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  setQuery: (query: string) => void;
  setSelectedIndex: (index: number) => void;
  selectCommand: (command: Command) => void;
  navigateUp: () => void;
  navigateDown: () => void;
  selectCurrent: () => void;
}

interface CommandPaletteContext extends CommandPaletteState, CommandPaletteActions {
  filteredGroups: CommandGroup[];
  flatCommands: Command[];
}

const CommandPaletteContext = createContext<CommandPaletteContext | null>(null);

interface CommandPaletteProviderProps {
  children: ReactNode;
  groups: CommandGroup[];
}

export function CommandPaletteProvider({
  children,
  groups,
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Global keyboard shortcut
  useKeyboardShortcut(["Meta", "k"], toggle);
  useKeyboardShortcut(["Escape"], close, { enabled: isOpen });

  // Filter commands based on query
  const filteredGroups = useMemo(() => {
    if (!query.trim()) return groups;

    const lowerQuery = query.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        commands: group.commands.filter(
          (cmd) =>
            cmd.label.toLowerCase().includes(lowerQuery) ||
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))
        ),
      }))
      .filter((group) => group.commands.length > 0);
  }, [groups, query]);

  const flatCommands = useMemo(
    () => filteredGroups.flatMap((g) => g.commands),
    [filteredGroups]
  );

  const selectCommand = useCallback(
    (command: Command) => {
      command.onSelect();
      close();
    },
    [close]
  );

  const navigateUp = useCallback(() => {
    setSelectedIndex((prev) =>
      prev <= 0 ? flatCommands.length - 1 : prev - 1
    );
  }, [flatCommands.length]);

  const navigateDown = useCallback(() => {
    setSelectedIndex((prev) =>
      prev >= flatCommands.length - 1 ? 0 : prev + 1
    );
  }, [flatCommands.length]);

  const selectCurrent = useCallback(() => {
    const command = flatCommands[selectedIndex];
    if (command) selectCommand(command);
  }, [flatCommands, selectedIndex, selectCommand]);

  const value: CommandPaletteContext = {
    isOpen,
    query,
    selectedIndex,
    open,
    close,
    toggle,
    setQuery,
    setSelectedIndex,
    selectCommand,
    navigateUp,
    navigateDown,
    selectCurrent,
    filteredGroups,
    flatCommands,
  };

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used within a CommandPaletteProvider"
    );
  }
  return context;
}
