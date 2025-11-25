// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/core/i18n/LanguageContext';
import { DEFAULT_LOCALE } from '@/core/i18n/locales';
import { ThemeProvider } from '@/core/themes/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BtnBack from '@/components/ui/BtnBack';
import JsonLd from '@/components/seo/JsonLd';

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
    url: 'https://calcuhub-lovat.vercel.app',
    siteName: 'CalcuHub',
    title: 'Calculadoras Online - CalcuHub',
    description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más.',
    images: [
      {
        url: '/og-image.jpg', // Needs to be created or added
        width: 1200,
        height: 630,
        alt: 'CalcuHub - Calculadoras Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras Online - CalcuHub',
    description: 'Colección de calculadoras online gratuitas para salud, finanzas, matemáticas y más.',
    images: ['/og-image.jpg'], // Needs to be created or added
    creator: '@calcuhub',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={DEFAULT_LOCALE.toString()} >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div className="page">
              <div className="app-shell">
                <JsonLd />
                <Header />
                <BtnBack />
                <main className="page-main">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
