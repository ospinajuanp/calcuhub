'use client';
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslation } from "@/core/i18n/useTranslation";

export default function Header() {
    const { tCommon } = useTranslation();
  return (
    <header className="header">
      <Link href="/" className="header-left">
        <h1>{tCommon.siteName}</h1>
      </Link>

      <div className="header-right">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}