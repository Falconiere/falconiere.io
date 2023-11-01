import { getPage, getPageHeaders } from "@/server-actions/notion";

import { Divider } from "@/ui/components/Divider";

import { PostRender } from "@/domains/blog/containers/PostRender";
import { Metadata } from "next";
import Script from "next/script";

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
  if (!pageID) return <h1>Not found</h1>;
  return (
    <>
      <div className="post-content">
        <h1 className="text-5xl font-bold pb-4">{title}</h1>
        <PostRender recordMap={recordMap} />
      </div>
      <Divider />
      <div id="graphcomment"></div>
      <Script>
        {`
          /* - - - CONFIGURATION VARIABLES - - - */

          var __semio__params = {
            graphcommentId: "falconiere", // make sure the id is yours
        
            behaviour: {
              // HIGHLY RECOMMENDED
              uid: "${pageID}", // uniq identifer for the comments thread on your page (ex: your page id)
            },
        
            // configure your variables here
        
          }
        
          /* - - - DON'T EDIT BELOW THIS LINE - - - */
        
          function __semio__onload() {
            __semio__gc_graphlogin(__semio__params)
          }
          (function() {
            var gc = document.createElement('script'); gc.type = 'text/javascript'; gc.async = true;
            gc.onload = __semio__onload; gc.defer = true; gc.src = 'https://integration.graphcomment.com/gc_graphlogin.js?' + Date.now();
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
          })();
          `}
      </Script>
    </>
  );
};
export default Page;
