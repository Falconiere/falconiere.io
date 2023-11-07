import { Metadata } from "next";

const meta = {
  title: "Projects | Falconiere R. Barbosa",
  description: "Hey! Here is my projects, check it out!",
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

const Page = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-400 bg-clip-text text-transparent text-2xl sm:text-4xl font-bold">
      Projects coming soon...
    </h2>
  </div>
);

export default Page;
