'use client';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useTheme } from '@/core/themes/ThemeContext';
import { type ThemeName } from '@/core/themes/ThemeContext';



export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { tCommon } = useTranslation();

  const THEME_OPTIONS = [
  { id: 'light', label: tCommon.theme.light },
  { id: 'dark', label: tCommon.theme.dark },
  { id: 'retro', label: tCommon.theme.retro },
  { id: 'carton', label: tCommon.theme.cardboard },
  { id: 'cartoon', label: tCommon.theme.cartoon },
] as const;

  return (
    <div className="theme-switcher">
      <label htmlFor="theme-select" className="sr-only">Cambiar tema</label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        className="switcher-select"
        aria-label="Seleccionar tema visual"
      >
        {THEME_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
