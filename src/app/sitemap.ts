import { MetadataRoute } from 'next';
import { categoriesConfig } from '@/core/config/categories';
import { calculatorsConfig } from '@/core/config/calculator';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub.vercel.app';

    const routes = [
        '',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    const categories = categoriesConfig.map((category) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const calculators = calculatorsConfig.map((calculator) => ({
        url: `${baseUrl}/calculator/${calculator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...categories, ...calculators];
}
