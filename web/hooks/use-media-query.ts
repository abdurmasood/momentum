"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to media query changes
 */
function subscribeToMediaQuery(
  query: string,
  callback: () => void
): () => void {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/**
 * Get current media query state
 */
function getMediaQuerySnapshot(query: string): boolean {
  return window.matchMedia(query).matches;
}

/**
 * Server snapshot always returns false
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Hook to detect if a media query matches
 * Uses useSyncExternalStore for proper React 18+ concurrent mode support
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) =>
    subscribeToMediaQuery(query, callback);
  const getSnapshot = () => getMediaQuerySnapshot(query);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Convenience hook for mobile detection
 */
export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

/**
 * Convenience hook for tablet detection
 */
export function useIsTablet() {
  return useMediaQuery("(max-width: 1024px)");
}
