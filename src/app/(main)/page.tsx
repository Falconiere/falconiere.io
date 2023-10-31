import { Metadata } from "next";
import Link from "next/link";

const Page = () => (
  <div className="text-center h-[calc(100vh-350px)] flex flex-col justify-center">
    <div>
      <h2 className="pb-4 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-400 bg-clip-text text-transparent text-5xl font-black">
        Hello! I'm Falconiere Barbosa!
        <br />
        Welcome to me personal website!
      </h2>
      <p className="text-xl inline-flex w-auto gap-2 text-center">
        <Link
          href="/about"
          className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
        >
          About
        </Link>
        <span>or</span>
        <Link
          href="/blog"
          className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
        >
          Blog
        </Link>
      </p>
    </div>
  </div>
);
export default Page;
