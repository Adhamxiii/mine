import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: 'https://adhamz.vercel.app/',
            lastModified: new Date().toISOString(),
        },
        {
            url: 'https://adhamz.vercel.app/projects',
            lastModified: new Date().toISOString(),
        },
    ]
};