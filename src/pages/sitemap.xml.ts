import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { baseDomain, buildPostURL } from '@/utils/buildPostURL';

const formatDate = (date: Date) => date.toISOString();

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  const origin = site?.origin ?? baseDomain;
  const sorted = posts
    .map(post => ({
      ...post,
      publishedAt: post.data.date ?? new Date(),
      updatedAt: post.data.updatedAt ?? post.data.date ?? new Date(),
    }))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  const latestUpdate = sorted[0]?.updatedAt ?? new Date();

  const staticUrls = [
    {
      loc: origin,
      lastmod: formatDate(latestUpdate),
      changefreq: 'weekly',
    },
    {
      loc: `${origin}/about`,
      lastmod: formatDate(latestUpdate),
      changefreq: 'monthly',
    },
  ];

  const postUrls = sorted.map(post => ({
    loc: buildPostURL(post),
    lastmod: formatDate(post.updatedAt),
    changefreq: 'monthly',
  }));

  const urls = [...staticUrls, ...postUrls]
    .map(
      ({ loc, lastmod, changefreq }) => `
				<url>
					<loc>${loc}</loc>
					<lastmod>${lastmod}</lastmod>
					<changefreq>${changefreq}</changefreq>
				</url>
			`
    )
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${urls}
	</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
  });
};
