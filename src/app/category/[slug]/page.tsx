// src/app/category/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoriesConfig, getCategoryBySlug } from '@/core/config/categories';
import { calculatorsConfig } from '@/core/config/calculator';
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app';
  const title = `${catTexts.name} · ${dict.common.siteName}`;
  const description = catTexts.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/category/${slug}`,
      siteName: 'CalcuHub',
      type: 'website',
      locale: 'es_ES',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: catTexts.name,
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
