'use client';

import Link from 'next/link';
import { useTranslation } from '@/core/i18n/useTranslation';
import * as Icons from '@/core/ui/iconRegistry';

export default function Footer() {
  const { tCommon } = useTranslation();
  const year = new Date().getFullYear();

  const In = Icons.iconRegistry.socialLinkedin;
  const Gh = Icons.iconRegistry.socialGithub;
  const Po = Icons.iconRegistry.socialPortfolio;

  return (
    <footer className="footer">
      <p className="footer-text">
        {tCommon.madeIn} <strong>Juan Pablo Ospina Restrepo</strong> — {year}
      </p>

      <div className="footer-links">
        <Link href="https://www.linkedin.com/in/ospinajuanp" target="_blank">
          <In/>
        </Link>

        <Link href="https://github.com/ospinajuanp" target="_blank">
          <Gh/>
        </Link>

        <Link href="https://ospinajuanp-portafolio.vercel.app/" target="_blank">
          <Po/>
        </Link>
      </div>
    </footer>
  );
}
