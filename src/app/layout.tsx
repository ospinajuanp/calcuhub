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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CalcuHub - Calculadoras Online Gratuitas',
    template: '%s | CalcuHub',
  },
  description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más. Calcula IMC, TMB, préstamos, intereses, fechas y conversiones fácilmente.',
  keywords: [
    'calculadora', 'calculadora online', 'calculadora gratis', 'calculadora salud',
    'calculadora finanzas', 'calculadora matemáticas', 'IMC', 'TMB', 'TDEE',
    'calculadora prestamos', 'calculadora intereses', 'calculadora impuestos',
    'calculadora fechas', 'calculadora conversiones', 'calculadora porcentaje',
    'calcular IMC', 'calcular TMB', 'calcular TDEE', 'herramientas online',
    'calculadora gratuita español', 'free calculator'
  ],
  authors: [{ name: 'CalcuHub Team', url: BASE_URL }],
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
    url: BASE_URL,
    siteName: 'CalcuHub',
    title: 'CalcuHub - Calculadoras Online Gratuitas',
    description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'CalcuHub - Calculadoras Online',
      },
    ],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'es': BASE_URL,
      'en': `${BASE_URL}/en`,
      'pt': `${BASE_URL}/pt`,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalcuHub - Calculadoras Online Gratuitas',
    description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más.',
    images: [`${BASE_URL}/og-image.png`],
    creator: '@calcuhub',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#337BFF',
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
