"use client";

import { useEffect, useRef } from "react";

const scripts = `
  <script
        id="comments"
        src="https://utteranc.es/client.js"
        repo="falconiere/falconiere.io"
        issue-term="url"
        theme="github-dark"
        crossorigin="anonymous"
        async
  ></script>`;
const CommentBox = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "falconiere/falconiere.io");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "github-dark");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    script.onload = () => {
      const commentBox = document.getElementById("comment-box");
      if (commentBox && commentBox.children[1]) {
        // @ts-ignore
        commentBox.children[1].style.display = "none";
      }
    };
    ref.current?.appendChild(script);
  }, []);

  return <div ref={ref} id="comment-box" />;
};

export { CommentBox };
