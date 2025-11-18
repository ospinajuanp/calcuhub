'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'light' | 'dark' | 'retro' | 'carton' | 'cartoon';

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'qch-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('light');

  // Leer tema inicial desde localStorage (solo en cliente)
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    if (stored) {
      applyTheme(stored);
    } else {
      applyTheme('light');
    }
  }, []);

  function applyTheme(next: ThemeName) {
    setThemeState(next);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = next;
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
