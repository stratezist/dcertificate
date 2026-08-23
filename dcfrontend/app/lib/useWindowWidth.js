import { useSyncExternalStore } from "react";

// 1. Define subscribe function to listen for resize events
function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

// 2. Define how to get the snapshot on the client
function getSnapshot() {
  return window.innerWidth;
}

// 3. Define a fallback value for Server-Side Rendering (SSR)
function getServerSnapshot() {
  return 1200; // Or a standard default desktop width like 1200 or 0
}

export function useWindowWidth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
