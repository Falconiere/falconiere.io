"use client";
import { NotionRenderer } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";

type PageProps = {
  recordMap: any;
};
const PostRender = ({ recordMap }: PageProps) => (
  <NotionRenderer
    recordMap={recordMap}
    darkMode
    forceCustomImages
    components={{
      Code,
      Equation,
      Modal,
      Collection: () => null,
    }}
  />
);

export { PostRender };
