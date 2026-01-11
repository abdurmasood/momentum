"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * LazyMotion provider for reduced bundle size
 * Uses domAnimation feature set (covers 95% of use cases)
 * For advanced features like layout animations, switch to domMax
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
