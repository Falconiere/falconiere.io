"use client";
import { allLinks } from "@/data/sociallinks";
import { NewsletterForm } from "../NewsletterForm";

const LayoutFooter = () => (
  <footer className="flex flex-col gap-4 items-center justify-center text-center px-10 pb-10 w-full max-w-4xl mx-auto">
    <NewsletterForm />
    <div className="flex gap-4 text-center items-center justify-center">
      {allLinks.map(({ Icon, ...link }) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 block text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
          title={`Link to my ${link.name} profile`}
        >
          {Icon}
        </a>
      ))}
    </div>
    <h4>Powered by Falconiere R. Barbosa</h4>
    <h5>© {new Date().getFullYear()}</h5>
  </footer>
);

export { LayoutFooter };
