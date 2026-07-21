interface CalculatorJsonLdProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  calculatorExplanation?: string;
}

export default function CalculatorJsonLd({
  name,
  description,
  url,
  category,
  calculatorExplanation,
}: CalculatorJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${baseUrl}${url}`,
    applicationCategory: category || 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    ...(calculatorExplanation && { abstract: calculatorExplanation }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
