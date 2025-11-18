// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/core/i18n/LanguageContext';
import { ThemeProvider } from '@/core/themes/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Calculadoras Inteligentes',
  description: 'Colección de calculadoras de salud y finanzas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div className="page">
              <div className="app-shell">
                <Header />
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
