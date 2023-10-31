import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const meta = {
  title: "Falconiere R. Barbosa | Software Engineer | ReactJs | ReactNative",
  description:
    "Hey! I'm Falconire R. Barbosa, software Engineer specialized in frontend with ReactJs and ReactNative. Let's chat!",
};

export const metadata: Metadata = {
  ...meta,

  openGraph: {
    ...meta,
    images: [
      {
        url: "/images/og-image.png",
        width: 800,
        height: 600,
      },
      {
        url: "/images/og-image.png",
        width: 1800,
        height: 1600,
        alt: meta.title,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SK3M5D79VS"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
      `}
      </Script>
    </html>
  );
}
