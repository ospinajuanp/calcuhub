import { MetadataRoute } from 'next';
import { categoriesConfig } from '@/core/config/categories';
import { calculatorsConfig } from '@/core/config/calculator';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        { route: '', priority: 1.0 as const, changeFrequency: 'daily' as const },
    ];

    const categories = categoriesConfig.map((category) => ({
        url: `${BASE_URL}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    const calculators = calculatorsConfig.map((calculator) => ({
        url: `${BASE_URL}/calculator/${calculator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        ...routes.map(({ route, priority, changeFrequency }) => ({
            url: `${BASE_URL}${route}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
        })),
        ...categories,
        ...calculators,
    ];
}
