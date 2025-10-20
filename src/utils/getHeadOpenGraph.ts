import { getEntry } from 'astro:content';
import { defaultMetaDescription } from '@/data/site/defaultMetaDescription';
import { buildPostURL } from '@/utils/buildPostURL';
import { format } from 'date-fns';

type Slug = string | string[] | undefined;

const withOrigin = (path: string) => `https://falconiere.io${path}`;

export const getHeadOpenGraph = async (slug?: Slug) => {
  const normalizedSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const post = normalizedSlug
    ? await getEntry('blog', normalizedSlug)
    : undefined;
  const title = post?.data?.title ?? defaultMetaDescription.title;
  const cover = post?.data?.cover ?? 'falconiere-barbosa-blog';
  const description =
    post?.data?.description ?? defaultMetaDescription.description;
  const image = withOrigin(cover ? `/api/og/${cover}` : '/api/og-image.png');
  const author = post?.data?.author ?? defaultMetaDescription.author;
  const publishedAt = post?.data?.date ?? new Date();
  const modifiedAt = post?.data?.updatedAt ?? publishedAt;
  const date = format(publishedAt, 'yyyy-MM-dd');
  const datePublished = publishedAt.toISOString();
  const dateModified = modifiedAt.toISOString();
  const tagsList = post?.data?.tags ?? [];
  const tags = tagsList.join(', ');
  const url = post ? buildPostURL(post) : withOrigin('');
  const canonicalUrl = url;
  const site_name = 'Falconiere R. Barbosa';
  const type = post ? 'article' : 'website';
  const coverAlt = post?.data?.coverAlt ?? 'Falconiere Barbosa - Blog';
  const keywords = defaultMetaDescription.keywords;
  const section = normalizedSlug ? (tagsList[0] ?? 'Blog') : 'home';
  const robots =
    'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';

  return {
    title,
    description,
    image,
    author,
    date,
    datePublished,
    dateModified,
    tags,
    tagsList,
    url,
    canonicalUrl,
    site_name,
    type,
    coverAlt,
    keywords,
    section,
    robots,
  };
};
