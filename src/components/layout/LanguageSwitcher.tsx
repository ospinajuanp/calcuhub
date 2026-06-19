'use client';
import { useLanguage } from '@/core/i18n/LanguageContext';
import { type Locale } from '@/core/i18n/locales';

const LANGUAGE_OPTIONS = [
  { id: 'es', label: 'Español' },
  { id: 'en', label: 'English' },
  { id: 'pt', label: 'Português' },
] as const;


export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="language-switcher">
      <label htmlFor="language-select" className="sr-only">Cambiar idioma</label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="switcher-select"
        aria-label="Seleccionar idioma"
      >
        {LANGUAGE_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

    </div>
  );
}