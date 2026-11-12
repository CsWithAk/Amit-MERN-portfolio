import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import publicApi from '../services/publicApi';

const SettingsContext = createContext(null);

// Convert a CSS color (#rgb, #rrggbb, rgb()/rgba()) into a space-separated RGB
// triplet for Tailwind's `rgb(var(--x-rgb) / <alpha-value>)` tokens. Returns null
// when the format can't be parsed, in which case we keep the previous triplet.
function toRgbTriplet(value) {
  if (!value) return null;
  const s = String(value).trim();
  if (s.startsWith('#')) {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    if (hex.length !== 6) return null;
    const n = parseInt(hex, 16);
    if (Number.isNaN(n)) return null;
    return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
  }
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const parts = m[1].split(/[,/\s]+/).map((p) => parseFloat(p)).filter((x) => !Number.isNaN(x));
    if (parts.length >= 3) return `${Math.round(parts[0])} ${Math.round(parts[1])} ${Math.round(parts[2])}`;
  }
  return null;
}

// Applies appearance tokens to :root so the Tailwind CSS-variable colors update live.
function applyAppearance(a = {}) {
  const root = document.documentElement;
  // token -> appearance key. Sets both the raw value (for gradients / color-mix)
  // and the RGB triplet (for Tailwind opacity modifiers).
  const tokens = {
    bg: a.background,
    'bg-2': a.secondaryBackground,
    card: a.cardBackground,
    primary: a.primaryColor,
    secondary: a.secondaryColor,
    highlight: a.accentColor,
    text: a.primaryText,
    muted: a.secondaryText,
  };
  Object.entries(tokens).forEach(([token, val]) => {
    if (!val) return;
    root.style.setProperty(`--${token}`, val);
    const triplet = toRgbTriplet(val);
    if (triplet) root.style.setProperty(`--${token}-rgb`, triplet);
  });
  if (a.borderColor) root.style.setProperty('--border', a.borderColor);
  if (a.borderRadius != null) root.style.setProperty('--radius', `${a.borderRadius}px`);
  if (a.fontFamily) {
    root.style.setProperty('--font-sans', `'${a.fontFamily}', system-ui, sans-serif`);
    root.style.setProperty('--font-display', `'${a.fontFamily}', system-ui, sans-serif`);
  }
  if (a.theme === 'light') root.classList.remove('dark');
  else root.classList.add('dark');
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await publicApi.settings();
      setSettings(data || null);
      if (data?.appearance) applyAppearance(data.appearance);
      const reduce = data?.animation?.reducedMotion;
      document.documentElement.classList.toggle('reduce-motion', !!reduce);
      return data;
    } catch {
      // Keep defaults on failure — the site must still render.
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const animation = settings?.animation || {};
  const value = useMemo(
    () => ({
      settings,
      loading,
      refresh: load,
      animation,
      seo: settings?.seo || {},
      multiCursorEnabled: animation.multiCursorEnabled !== false,
      reducedMotion: !!animation.reducedMotion,
    }),
    [settings, loading, load, animation]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

export default SettingsContext;
