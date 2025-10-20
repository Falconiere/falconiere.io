import { getCollection } from 'astro:content';
import { generateOGImage } from '@/utils/generateOGImage';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, props }) => {
  const filename = params.filename;
  const post = filename ? props.post : null;
  const png = await generateOGImage({ post });
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
};

export const getStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { filename: post.data?.cover },
    props: {
      post: post,
    },
  }));
};
