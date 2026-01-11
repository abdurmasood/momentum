export type TagColor =
  | "slate"
  | "red"
  | "orange"
  | "amber"
  | "emerald"
  | "cyan"
  | "blue"
  | "violet"
  | "pink";

export interface Tag {
  id: string;
  name: string;
  color: TagColor;
  thoughtCount: number;
}

// Monochromatic Linear-style tag colors
export const tagColorMap: Record<TagColor, string> = {
  slate: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  red: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  orange: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  amber: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  emerald: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  cyan: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  blue: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  violet: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  pink: "bg-white/[0.06] text-white/70 border-white/[0.08]",
};
