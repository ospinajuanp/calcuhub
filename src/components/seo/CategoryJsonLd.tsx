'use client';

interface CategoryJsonLdProps {
  name: string;
  description: string;
  url: string;
  calculators: string[];
}

export default function CategoryJsonLd({ name, description, url, calculators }: CategoryJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: calculators.map((calcUrl, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: calcUrl,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}