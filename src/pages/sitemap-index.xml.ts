import type { APIRoute } from 'astro';
import { baseDomain } from '@/utils/buildPostURL';

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? baseDomain;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
	<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		<sitemap>
			<loc>${origin}/sitemap.xml</loc>
		</sitemap>
	</sitemapindex>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
  });
};
