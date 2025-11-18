'use client';
import Link from 'next/link';
import { useTranslation } from '@/core/i18n/useTranslation';
// recibes los datos que ya resolviste en el server: category y calculators
import type { CategoryConfig } from '@/core/config/categories';
import {calculatorsConfig, type CalculatorConfig } from '@/core/config/calculator';
import * as Icons from '@/core/ui/iconRegistry';

interface CategoryClientProps {
  category: CategoryConfig;
  calculators: CalculatorConfig[];
}

export function CategoryClient({ category, calculators }: CategoryClientProps) {
  const { tCategories, tCalculators } = useTranslation();

  const catTexts = tCategories[category.id];
    const calculatorsInCategory: CalculatorConfig[] = calculatorsConfig.filter(
    (calc) => calc.categoryId === category.id
  );

  return (
    <section className="section">
      <div className="section-header">
        <h1>{catTexts.name}</h1>
        <p>{catTexts.description}</p>
      </div>

      <div className="grid category-grid">
        {calculatorsInCategory.map((calc) => {
          const texts = tCalculators[calc.id];
          const SpecificIcon = Icons.iconRegistry[calc.iconId] || Icons.iconRegistry['calculator'];
          

          return (
            <Link href={`/calculator/${calc.slug}`} key={calc.id} className='card-link'>
              <article key={calc.id} className='card'>
                <div className="card-icon">
                  {calc.iconId && (() => {
                    const IconComponent = (Icons as any)[calc.iconId!];
                    return IconComponent ? <IconComponent className="icon" /> : null;
                  })()}
                  <SpecificIcon className="icon" />
                </div>
                <div className='card-content'>
                  <h3 className='card-title '>{texts.name}</h3>
                  <p className='card-description'>{texts.shortDescription}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
