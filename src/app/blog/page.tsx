import { PostCard } from "@/domains/blog/components/PostCard";
import { getDatabase } from "@/server-actions/notion";
import { Divider } from "@/ui/components/Divider";
import { Metadata } from "next";

const meta = {
  title: "Blog | Falconiere R. Barbosa",
  description:
    "Hey! Here is my blog, where I share my thoughts about software development, tech, and life.",
};

export const metadata: Metadata = {
  ...meta,
  openGraph: {
    ...meta,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Falconiere R. Barbosa",
    authors: "Falconiere R. Barbosa",
  },
};

const Page = async () => {
  const { results } = await getDatabase();
  if (Array.isArray(results) && results.length > 0) {
    return (
      <>
        <div className="grid gap-8">
          <h1 className="text-5xl font-bold">Latest</h1>
          <div className="grid gap-[20px]">
            {results.map((result: any) => {
              const cover = result.cover.external.url;
              const title = result.properties.Post.title[0].plain_text;
              const description =
                result.properties.Description.rich_text[0].plain_text;
              const publishedAt = result.properties.Published.date.start;
              return (
                <PostCard
                  title={title}
                  id={result.id}
                  coverUrl={cover}
                  key={result.id}
                  description={description}
                  publishedAt={publishedAt}
                />
              );
            })}
          </div>
        </div>
        <Divider />
      </>
    );
  }
  return <h1>No results</h1>;
};
export default Page;
