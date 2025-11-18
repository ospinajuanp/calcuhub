// src/app/page.tsx
'use client';

import Link from 'next/link';
import { categoriesConfig } from '../core/config/categories';
import { calculatorsConfig } from '../core/config/calculator';
import { useTranslation } from '../core/i18n/useTranslation';
import * as Icons from '../core/ui/iconRegistry';

export default function HomePage() {
  const { tCommon, tCategories, tCalculators } = useTranslation();

  const featuredCalculators = calculatorsConfig.filter(
    (calc) => calc.featured
  );

  return (
    <>
      <section className="section">
        <header className="section-header">
          <h2 className="section-header-title">
            {tCommon.calculatorsTitle}
          </h2>
          <p className="section-header-subtitle">
            Accede rápido a las herramientas más usadas.
          </p>
        </header>

        <div className="grid section-header">
          {featuredCalculators.map((calc) => {
            const texts = tCalculators[calc.id];
            const SpecificIconFeature = Icons.iconRegistry[calc.iconId] || Icons.iconRegistry['calculator'];

            if (!calc.featured) return null;

            return (
              <Link href={`/calculator/${calc.slug}`} className='card-link' key={calc.id}>
                <article key={calc.id} className='card'>
                  <div className="card-icon">
                    {calc.iconId && (() => {
                      const IconComponent = (Icons as any)[calc.iconId!];
                      return IconComponent ? <IconComponent className="icon" /> : null;
                    })()}
                    <SpecificIconFeature className="icon" />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>{texts.name}</h3>
                    <p className='card-description'>{texts.shortDescription}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
      
      <section className="section">
        <header className="section-header">
          <h1 className="section-header-title">
            {tCommon.categoriesTitle}
          </h1>
          <p className="section-header-subtitle">
            Explora calculadoras agrupadas por áreas de interés.
          </p>
        </header>

        <div className="grid section-header">
          {categoriesConfig.map((category) => {
            const catTexts = tCategories[category.id];
            const SpecificIconCategories = Icons.iconRegistry[category.iconId] || Icons.iconRegistry['calculator'];

            return (
              <Link href={`/category/${category.slug}`} className='card-link' key={category.id}>
                <article key={category.id} className='card'>
                  <div className="card-icon">
                    {category.iconId && (() => {
                      const IconComponent = (Icons as any)[category.iconId!];
                      return IconComponent ? <IconComponent className="icon" /> : null;
                    })()}
                    <SpecificIconCategories className="icon" />
                  </div>
                  <div>
                    <h3 className='card-title'>{catTexts.name}</h3>
                    <p className='card-description'>{catTexts.description}</p>
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
