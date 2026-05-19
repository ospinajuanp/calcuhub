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
    <footer className="footer" role="contentinfo">
      <p className="footer-text">
        {tCommon.madeIn} <strong>Juan Pablo Ospina Restrepo</strong> — {year}
      </p>

      <nav aria-label="Redes sociales">
        <div className="footer-links">
          <Link href="https://www.linkedin.com/in/ospinajuanp" target="_blank" rel="noopener noreferrer" aria-label="Perfil de LinkedIn">
            <span className="sr-only">LinkedIn</span>
            <In aria-hidden="true"/>
          </Link>

          <Link href="https://github.com/ospinajuanp" target="_blank" rel="noopener noreferrer" aria-label="Perfil de GitHub">
            <span className="sr-only">GitHub</span>
            <Gh aria-hidden="true"/>
          </Link>

          <Link href="https://ospinajuanp-portafolio.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portafolio personal">
            <span className="sr-only">Portafolio</span>
            <Po aria-hidden="true"/>
          </Link>
        </div>
      </nav>
    </footer>
  );
}
