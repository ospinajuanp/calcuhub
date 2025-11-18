'use client';
import { useTranslation } from '@/core/i18n/useTranslation';
import type { CalculatorConfig } from '@/core/config/calculator';
import * as registry from '@/features/calculators/calculatorRegistry'

interface CalculatorClientProps {
  calculator: CalculatorConfig;
}

export function CalculatorClient({ calculator }: CalculatorClientProps) {
  const { tCategories, tCalculators } = useTranslation();

  const calcTexts = tCalculators[calculator.id];

  // JSON-LD → Mejor rankeo en Google + AIO understanding
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    applicationCategory: 'CalculatorApplication',
    name: calcTexts.name,
    description: calcTexts.shortDescription,
  };

  const SpecificCalculator = registry.calculatorRegistry[calculator.id];


  return (
    <div className="calculator-page">
      <section className="section section-header">
        <h1>{calcTexts.name}</h1>
        <p>{calcTexts.shortDescription}</p>
      </section>

      {/* Aquí irá tu formulario real */}
      <section className="section">
        <div className='card card-calculator'>
          {SpecificCalculator ? (
            <SpecificCalculator />
          ) : (
            <p>
              This calculator is not yet implemented. Please check back later.
            </p>
          )}

        </div>
        <div className="card calculator-result-card">
          <h2>Información sobre esta calculadora</h2>
          <p>
            Aquí puedes añadir texto extendido explicando cómo se usa
            esta calculadora, qué fórmula aplica y cómo interpretar el
            resultado.
          </p>
        </div>

      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
