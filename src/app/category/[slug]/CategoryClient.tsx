'use client';
import Link from 'next/link';
import { useTranslation } from '@/core/i18n/useTranslation';
import type { CategoryConfig } from '@/core/config/categories';
import type { CalculatorConfig } from '@/core/config/calculator';
import * as Icons from '@/core/ui/iconRegistry';
import CategoryJsonLd from '@/components/seo/CategoryJsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

interface CategoryClientProps {
  category: CategoryConfig;
  calculators: CalculatorConfig[];
}

export function CategoryClient({ category, calculators }: CategoryClientProps) {
  const { tCategories, tCalculators } = useTranslation();

  const catTexts = tCategories[category.id];

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: catTexts.name.replace('.', ''), url: `/category/${category.slug}` },
  ];

  const calculatorsForJsonLd = calculators.map((calc) => {
    const texts = tCalculators[calc.id];
    return {
      name: texts.name.replace('.', ''),
      url: `/calculator/${calc.slug}`,
    };
  });

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CategoryJsonLd
        name={catTexts.name.replace('.', '')}
        description={catTexts.description}
        url={`/category/${category.slug}`}
        calculators={calculatorsForJsonLd}
      />

      <section className="section">
        <div className="section-header">
          <h1>{catTexts.name.replace('.', '')}</h1>
          <p>{catTexts.description}</p>
        </div>

        <div className="grid category-grid">
          {calculators.map((calc) => {
            const texts = tCalculators[calc.id];
            const SpecificIcon = Icons.iconRegistry[calc.iconId] || Icons.iconRegistry['calculator'];

            return (
              <Link href={`/calculator/${calc.slug}`} key={calc.id} className='card-link'>
                <article className='card'>
                  <div className="card-icon">
                    {calc.iconId && (() => {
                      const IconComponent = (Icons as any)[calc.iconId!];
                      return IconComponent ? <IconComponent className="icon" /> : null;
                    })()}
                    <SpecificIcon className="icon" />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title '>{texts.name.replace('.', '')}</h3>
                    <p className='card-description'>{texts.shortDescription}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
