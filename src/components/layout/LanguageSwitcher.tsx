'use client';
import { useLanguage } from '@/core/i18n/LanguageContext';

const LANGUAGE_OPTIONS = [
  { id: 'es', label: 'Spanish' },
  { id: 'en', label: 'English' },
  { id: 'pt', label: 'Portuguese' },
] as const;


export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as any)}
        className="switcher-select"
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