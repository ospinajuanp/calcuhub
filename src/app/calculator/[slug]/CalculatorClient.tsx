'use client';
import { useState } from 'react';
import { useTranslation } from '@/core/i18n/useTranslation';
import type { CalculatorConfig } from '@/core/config/calculator';
import * as registry from '@/features/calculators/calculatorRegistry'
import CalculatorJsonLd from '@/components/seo/CalculatorJsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { Trash } from 'lucide-react'

interface CalculatorClientProps {
  calculator: CalculatorConfig;
}

export function CalculatorClient({ calculator }: CalculatorClientProps) {
  const [version, setVersion] = useState<number>(0)
  const { tCalculators, tCategories } = useTranslation();

  const calcTexts = tCalculators[calculator.id];
  const categoryTexts = tCategories[calculator.categoryId];

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: categoryTexts.name.replace('.', ''), url: `/category/${calculator.categoryId}` },
    { name: calcTexts.name.replace('.', ''), url: `/calculator/${calculator.slug}` },
  ];

  const SpecificCalculator = registry.calculatorRegistry[calculator.id];

  const handleRecrear = () => {
    setVersion((v) => v + 1);
  };


  return (
    <div className="calculator-page">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CalculatorJsonLd
        name={calcTexts.name.replace('.', '')}
        description={calcTexts.shortDescription}
        url={`/calculator/${calculator.slug}`}
        category={categoryTexts.name.replace('.', '')}
        calculatorExplanation={calcTexts.calculatorExplanation}
      />

      <section className="section section-header">
        <h1>{calcTexts.name.replace('.', '')}</h1>
        <p>{calcTexts.shortDescription}</p>
      </section>

      <section className="section">
        <div className='card card-calculator '>
          <button className='button btn-reload'
           onClick={handleRecrear}>
            <Trash/>
          </button>
          {SpecificCalculator ? (
            <SpecificCalculator key={version} />
          ) : (
            <p>
              This calculator is not yet implemented. Please check back later.
            </p>
          )}

        </div>

        <div className="card calculator-result-card maxWidth">
          <p>
            {calcTexts.calculatorExplanation}
          </p>
        </div>

      </section>
    </div>
  );
}
