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

  const title = `${texts.name} · ${dict.common.siteName}`;
  const description = texts.shortDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/calculator/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/calculator/${slug}`,
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
