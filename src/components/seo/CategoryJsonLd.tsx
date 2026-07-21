interface CategoryJsonLdProps {
  name: string;
  description: string;
  url: string;
  calculators: { name: string; url: string }[];
}

export default function CategoryJsonLd({
  name,
  description,
  url,
  calculators,
}: CategoryJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${baseUrl}${url}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: calculators.map((calc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: calc.name,
        url: `${baseUrl}${calc.url}`,
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
