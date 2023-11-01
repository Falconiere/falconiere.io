import { getPage, getPageHeaders } from "@/server-actions/notion";

import { Divider } from "@/ui/components/Divider";

import { PostRender } from "@/domains/blog/containers/PostRender";
import { Metadata } from "next";

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
  const { title, description, cover } = await getPageHeaders(pageID);
  return {
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
      },
    },
    title: `Blog | Falconiere R. Barbosa | ${title}`,
    description,
    openGraph: {
      siteName: "Falconiere R. Barbosa",
      title: `Blog | Falconiere R. Barbosa | ${title}`,
      description,
      images: [
        {
          url: cover,
          alt: title,
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
  return (
    <>
      <div className="post-content">
        <h1 className="text-5xl font-bold pb-4">{title}</h1>
        <PostRender recordMap={recordMap} />
      </div>
      <Divider />
    </>
  );
};
export default Page;
