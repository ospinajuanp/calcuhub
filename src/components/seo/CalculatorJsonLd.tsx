'use client';

interface CalculatorJsonLdProps {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export default function CalculatorJsonLd({ name, description, url, category }: CalculatorJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: category || 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}