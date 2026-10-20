/**
 * Theme palettes. Each is a handful of CSS custom properties; light and dark
 * are picked automatically from the visitor's system preference.
 * Colors are tuned to keep body text at WCAG AA contrast (4.5:1+) in both modes.
 */

export interface Theme {
  light: Palette;
  dark: Palette;
}

interface Palette {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  ring: string;
}

function palette(p: Palette): Palette {
  return p;
}

export const THEMES: Record<string, Theme> = {
  sunrise: {
    light: palette({ bg: "#fff7ed", surface: "#ffffff", text: "#431407", muted: "#7c4a1e", accent: "#ea580c", accentText: "#ffffff", ring: "#fdba74" }),
    dark: palette({ bg: "#1c0f08", surface: "#2a1a10", text: "#ffedd5", muted: "#d9a06b", accent: "#fb923c", accentText: "#1c0f08", ring: "#7c2d12" }),
  },
  lagoon: {
    light: palette({ bg: "#f0fdfa", surface: "#ffffff", text: "#042f2e", muted: "#0f5e59", accent: "#0d9488", accentText: "#ffffff", ring: "#5eead4" }),
    dark: palette({ bg: "#041614", surface: "#0a2422", text: "#ccfbf1", muted: "#6fd8cb", accent: "#2dd4bf", accentText: "#041614", ring: "#115e59" }),
  },
  forest: {
    light: palette({ bg: "#f7fee7", surface: "#ffffff", text: "#1a2e05", muted: "#3f5d15", accent: "#4d7c0f", accentText: "#ffffff", ring: "#bef264" }),
    dark: palette({ bg: "#0e1506", surface: "#1a260d", text: "#ecfccb", muted: "#aad576", accent: "#a3e635", accentText: "#0e1506", ring: "#3f6212" }),
  },
  plum: {
    light: palette({ bg: "#fdf4ff", surface: "#ffffff", text: "#4a044e", muted: "#7e22ce", accent: "#a21caf", accentText: "#ffffff", ring: "#f0abfc" }),
    dark: palette({ bg: "#1c0620", surface: "#2c0f31", text: "#fae8ff", muted: "#dda3ec", accent: "#e879f9", accentText: "#1c0620", ring: "#86198f" }),
  },
  slate: {
    light: palette({ bg: "#f8fafc", surface: "#ffffff", text: "#0f172a", muted: "#475569", accent: "#334155", accentText: "#ffffff", ring: "#cbd5e1" }),
    dark: palette({ bg: "#0b1220", surface: "#16202f", text: "#e2e8f0", muted: "#94a3b8", accent: "#94a3b8", accentText: "#0b1220", ring: "#334155" }),
  },
  ember: {
    light: palette({ bg: "#fef2f2", surface: "#ffffff", text: "#450a0a", muted: "#991b1b", accent: "#dc2626", accentText: "#ffffff", ring: "#fca5a5" }),
    dark: palette({ bg: "#1b0707", surface: "#2c1010", text: "#fee2e2", muted: "#f0a1a1", accent: "#f87171", accentText: "#1b0707", ring: "#7f1d1d" }),
  },
};

export const DEFAULT_THEME = "sunrise";

export function themeCss(name: string): string {
  const t = THEMES[name] ?? THEMES[DEFAULT_THEME];
  const vars = (p: Palette) =>
    `--bg:${p.bg};--surface:${p.surface};--text:${p.text};--muted:${p.muted};--accent:${p.accent};--accent-text:${p.accentText};--ring:${p.ring};`;
  return `:root{${vars(t.light)}}@media (prefers-color-scheme: dark){:root{${vars(t.dark)}}}`;
}
