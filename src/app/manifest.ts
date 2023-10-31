import { MetadataRoute } from "next";
import { defaultMeta } from "./layout";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:defaultMeta.title,
    short_name: defaultMeta.title,
    description: defaultMeta.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#1c1c1c',
    theme_color: '#1c1c1c',
    icons: [
      {
        src: 'favicon/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        "src": "favicon/android-icon-36x36.png",
        "sizes": "36x36",
        "type": "image/png",
       },
       {
        "src": "favicon/android-icon-48x48.png",
        "sizes": "48x48",
        "type": "image/png",
       },
       {
        "src": "favicon/android-icon-72x72.png",
        "sizes": "72x72",
        "type": "image/png",
       },
       {
        "src": "favicon/android-icon-96x96.png",
        "sizes": "96x96",
        "type": "image/png",
       },
       {
        "src": "favicon/android-icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png",
       },
       {
        "src": "favicon/android-icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
       }
    ],
  }
}