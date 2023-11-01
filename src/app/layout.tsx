import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const defaultMeta = {
  title: "Falconiere R. Barbosa | Software Engineer | ReactJs | ReactNative",
  description:
    "Hey! I'm Falconire R. Barbosa, software Engineer specialized in frontend with ReactJs and ReactNative. Let's chat!",
};

export const metadata: Metadata = {
  ...defaultMeta,
  manifest: "/favicon/manifest.json",
  icons: [
    {
      url: "/favicon/favicon.ico",
      type: "image/x-icon",
    },
    {
      url: "/favicon/android-icon-36x36.png",
      type: "image/png",
    },
    {
      url: "/favicon/android-icon-48x48.png",
      type: "image/png",
    },
    {
      url: "/favicon/android-icon-72x72.png",
      type: "image/png",
    },
    {
      url: "/favicon/android-icon-96x96.png",
      type: "image/png",
    },
    {
      url: "/favicon/android-icon-144x144.png",
      type: "image/png",
    },
    {
      url: "/favicon/android-icon-192x192.png",
      type: "image/png",
    },
  ],
  openGraph: {
    ...defaultMeta,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
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

          gtag('config', '${process.env.GOOGLE_ANALYTICS}');
      `}
      </Script>
    </html>
  );
}
