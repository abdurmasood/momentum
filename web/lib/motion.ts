import type { Transition, Variants } from "motion/react";

/**
 * Core animation timing constants
 * Subtle, refined timing for premium feel
 */
export const timing = {
  fast: 0.12,
  normal: 0.18,
  slow: 0.24,
  slower: 0.4,
  page: 0.3,
} as const;

/**
 * Easing curves - smooth and understated
 */
export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOutSine: [0.37, 0, 0.63, 1] as const,
} as const;

/**
 * Reusable transition presets
 */
export const transitions = {
  /** Default entry animation */
  default: {
    duration: timing.slow,
    ease: easing.outQuart,
  } satisfies Transition,

  /** Fast micro-interactions (hover, focus) */
  micro: {
    duration: timing.fast,
    ease: easing.outQuart,
  } satisfies Transition,

  /** Page transitions */
  page: {
    duration: timing.page,
    ease: easing.outQuart,
  } satisfies Transition,

  /** Layout animations - higher damping for no bounce */
  layout: {
    type: "spring",
    stiffness: 400,
    damping: 40,
  } satisfies Transition,

  /** Spring animation - critically damped */
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
  } satisfies Transition,
} as const;

/**
 * Reusable variant presets - subtle movements
 */
export const variants = {
  /** Fade in from below - minimal lift */
  fadeUp: {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.default,
    },
    exit: {
      opacity: 0,
      transition: { duration: timing.fast },
    },
  } satisfies Variants,

  /** Fade in with scale - barely perceptible */
  fadeScale: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitions.default,
    },
    exit: {
      opacity: 0,
      transition: { duration: timing.fast },
    },
  } satisfies Variants,

  /** Simple fade */
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.default },
    exit: { opacity: 0, transition: { duration: timing.fast } },
  } satisfies Variants,

  /** Stagger container - quick succession */
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.04,
        when: "beforeChildren",
      },
    },
  } satisfies Variants,

  /** Stagger item - minimal movement */
  staggerItem: {
    hidden: { opacity: 0, y: 3 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.default,
    },
  } satisfies Variants,

  /** Command palette overlay */
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: timing.normal } },
    exit: { opacity: 0, transition: { duration: timing.fast } },
  } satisfies Variants,

  /** Command palette panel - subtle entrance */
  commandPalette: {
    hidden: { opacity: 0, scale: 0.98, y: -4 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: transitions.default,
    },
    exit: {
      opacity: 0,
      scale: 0.99,
      transition: { duration: timing.fast },
    },
  } satisfies Variants,

  /** Card hover - opacity only, no transform */
  cardHover: {
    rest: { opacity: 1 },
    hover: { opacity: 1 },
    tap: { opacity: 0.95 },
  } satisfies Variants,

  /** Sidebar item - no movement */
  sidebarItem: {
    rest: { opacity: 1 },
    hover: { opacity: 1 },
  } satisfies Variants,
} as const;

/**
 * Scroll-triggered animation config
 */
export const viewport = {
  /** Trigger once when 20% visible */
  once: { once: true, amount: 0.2 },
  /** Trigger each time */
  repeat: { once: false, amount: 0.2 },
  /** Trigger when mostly visible */
  full: { once: true, amount: 0.8 },
} as const;

/**
 * Page transition variants - subtle fade
 */
export const pageTransition = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.page,
  },
  exit: {
    opacity: 0,
    transition: { duration: timing.fast },
  },
} as const;
