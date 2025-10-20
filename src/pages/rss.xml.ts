import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { baseDomain, buildPostURL } from '@/utils/buildPostURL';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const formatRfc2822 = (date: Date) => date.toUTCString();

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  const sorted = posts
    .map(post => ({
      ...post,
      publishedAt: post.data.date ?? new Date(),
      updatedAt: post.data.updatedAt ?? post.data.date ?? new Date(),
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const origin = site?.origin ?? baseDomain;
  const items = sorted
    .map(post => {
      const link = buildPostURL(post);
      const title = escapeXml(post.data.title);
      const description = escapeXml(post.data.description);
      const categories = (post.data.tags ?? [])
        .map(tag => `<category>${escapeXml(tag)}</category>`)
        .join('');
      return `
        <item>
          <title>${title}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <description>${description}</description>
          <pubDate>${formatRfc2822(post.publishedAt)}</pubDate>
          <lastBuildDate>${formatRfc2822(post.updatedAt)}</lastBuildDate>
          ${categories}
        </item>
      `;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Falconiere R. Barbosa</title>
      <link>${origin}</link>
      <description>${escapeXml(
        'Insights and reflections from Falconiere R. Barbosa'
      )}</description>
      <language>en-us</language>
      <lastBuildDate>${formatRfc2822(
        sorted[0]?.updatedAt ?? new Date()
      )}</lastBuildDate>
      <ttl>180</ttl>
      ${items}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=UTF-8',
    },
  });
};
