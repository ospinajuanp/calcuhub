import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug, calculatorsConfig } from '@/core/config/calculator';
import { getDictionary } from '@/core/i18n/dictionaries';
import { DEFAULT_LOCALE } from '@/core/i18n/locales';
import { CalculatorClient } from './CalculatorClient';

// 1. Genera rutas estáticas
export function generateStaticParams() {
  return calculatorsConfig.map((calc) => ({
    slug: calc.slug,
  }));
}

// 2. SEO/AIO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const calculator = getCalculatorBySlug(slug);
  if (!calculator) {
    return {};
  }

  const dict = getDictionary(DEFAULT_LOCALE);
  const texts = dict.calculators[calculator.id];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app';
  const title = `${texts.name} · ${dict.common.siteName}`;
  const description = texts.shortDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/calculator/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/calculator/${slug}`,
      siteName: 'CalcuHub',
      type: 'website',
      locale: 'es_ES',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: texts.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

// 3. Página (server) → delega a cliente
export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const calculator = getCalculatorBySlug(slug);

  if (!calculator) notFound();

  return <CalculatorClient calculator={calculator} />;
}
