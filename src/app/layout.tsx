// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider, useLanguage } from '@/core/i18n/LanguageContext';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/core/i18n/locales';
import { ThemeProvider } from '@/core/themes/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BtnBack from '@/components/ui/BtnBack';
import JsonLd from '@/components/seo/JsonLd';

function MetadataWrapper({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage();
  return <div lang={locale}>{children}</div>;
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app'),
  title: {
    default: 'Calculadoras Online - CalcuHub',
    template: '%s | CalcuHub',
  },
  description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más. Calcula IMC, TMB, préstamos y conversiones fácilmente.',
  keywords: ['calculadora', 'online', 'gratis', 'salud', 'finanzas', 'matemáticas', 'imc', 'tmb', 'prestamos'],
  authors: [{ name: 'CalcuHub Team' }],
  creator: 'CalcuHub',
  publisher: 'CalcuHub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app',
    siteName: 'CalcuHub',
    title: 'Calculadoras Online - CalcuHub',
    description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'CalcuHub - Calculadoras Online',
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app',
    languages: {
      'es': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app'}`,
      'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app'}/en`,
      'pt': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app'}/pt`,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras Online - CalcuHub',
    description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app'}/og-image.png`],
    creator: '@calcuhub',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="page">
          <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
          <div className="app-shell">
            <JsonLd />
            <Header />
            <BtnBack />
            <main id="main-content" className="page-main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <body>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
