'use client';
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png"
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslation } from "@/core/i18n/useTranslation";

export default function Header() {
    const { tCommon } = useTranslation();
  return (
    <header className="header" role="banner">
      <Link href="/" className="header-left" aria-label="CalcuHub - Ir a la página principal">
        <Image src={logo} alt="CalcuHub - Calculadoras Online" width={154} height={102} className="header-img"/>
      </Link>

      <div className="header-right">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}