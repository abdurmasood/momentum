"use client";

import { m } from "motion/react";
import { pageTransition } from "@/lib/motion";
import type { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

/**
 * Template component wraps each page for entry animations
 * Unlike layout.tsx, template re-mounts on navigation
 * enabling per-page transition animations
 */
export default function Template({ children }: TemplateProps) {
  return (
    <m.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      className="min-h-screen"
    >
      {children}
    </m.div>
  );
}
