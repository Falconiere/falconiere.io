import { getPage, getPageHeaders } from "@/server-actions/notion";
import { Divider } from "@/ui/components/Divider";
import { PostRender } from "@/domains/blog/containers/PostRender";
import { Metadata } from "next";
import { CommentBox } from "@/domains/blog/components/CommentBox";

type PageProps = {
  params: {
    slug: string;
    pageID: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pageID = params.pageID;
  const slug = params.slug;
  const url = `https://falconiere.io/blog/${slug}/${pageID}`;
  const { title, description, cover } = await getPageHeaders(pageID);
  const _title = `Blog | Falconiere R. Barbosa | ${title}`;
  return {
    applicationName: "Blog | Falconiere R. Barbosa",
    authors: {
      name: "Falconiere R. Barbosa",
      url: "https://falconiere.io",
    },
    title: _title,
    description,
    openGraph: {
      url,
      authors: "Falconiere R. Barbosa",
      siteName: "Falconiere R. Barbosa",
      title: _title,
      description,
      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const pageID = params.pageID;
  const recordMap = await getPage(pageID);
  const title = recordMap?.block[pageID]?.value?.properties?.title[0][0];
  if (!pageID) return <h1>Not found</h1>;
  return (
    <>
      <div className="post-content">
        <h1 className="text-3xl font-bold pb-4">{title}</h1>
        <PostRender recordMap={recordMap} />
      </div>
      <Divider />
      <CommentBox />
    </>
  );
};
export default Page;
