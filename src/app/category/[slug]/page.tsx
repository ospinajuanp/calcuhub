// src/app/category/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoriesConfig, getCategoryBySlug } from '@/core/config/categories';
import { calculatorsConfig, type CalculatorConfig } from '@/core/config/calculator';
import { getDictionary } from '@/core/i18n/dictionaries';
import { DEFAULT_LOCALE } from '@/core/i18n/locales';
import { CategoryClient } from './CategoryClient';

// 1. Generar las rutas estáticas (build time)
export function generateStaticParams() {
  return categoriesConfig.map((category) => ({
    slug: category.slug,
  }));
}

// 2. Metadatos SEO / AIO para la categoría
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (!category) {
    return {};
  }

  const dict = getDictionary(DEFAULT_LOCALE);
  const catTexts = dict.categories[category.id];

  const title = `${catTexts.name} · ${dict.common.siteName}`;
  const description = catTexts.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/category/${slug}`,
    },
  };
}

// 3. Página de categoría
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const calculatorsInCategory = calculatorsConfig.filter(
    (c) => c.categoryId === category.id
  );

  return (
    <CategoryClient
      category={category}
      calculators={calculatorsInCategory}
    />
  );
}
