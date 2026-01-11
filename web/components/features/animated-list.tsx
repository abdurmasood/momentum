"use client";

import { m, AnimatePresence } from "motion/react";
import { variants, transitions } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface AnimatedListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
  /** Stagger delay between items in seconds */
  staggerDelay?: number;
  className?: string;
  /** Enable layout animations for reordering */
  layoutAnimations?: boolean;
}

export function AnimatedList<T>({
  items,
  keyExtractor,
  renderItem,
  staggerDelay = 0.05,
  className,
  layoutAnimations = true,
}: AnimatedListProps<T>) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
            when: "beforeChildren",
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={cn("space-y-3", className)}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <m.div
            key={keyExtractor(item)}
            variants={variants.staggerItem}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            layout={layoutAnimations}
            transition={transitions.spring}
          >
            {renderItem(item, index)}
          </m.div>
        ))}
      </AnimatePresence>
    </m.div>
  );
}
