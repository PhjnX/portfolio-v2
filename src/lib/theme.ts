// Shared by the root layout's inline script (server) and ThemeToggle (client).
// Not in theme-toggle.tsx: exports of a "use client" module reach server code as
// client references, not as plain values.

export type Theme = "dark" | "light";

/** localStorage key holding the visitor's choice */
export const THEME_KEY = "theme";

/** Browser UI colour (<meta name="theme-color">) per theme: the page background */
export const THEME_COLOR: Record<Theme, string> = { dark: "#0b0a09", light: "#f4eee3" };
