// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/_server-islands/*"
  ],
  exclude: [
    "/",
    "/_astro/*",
    "/.assetsignore",
    "/apple-touch-icon.png",
    "/favicon-96x96.png",
    "/favicon.ico",
    "/favicon.svg",
    "/robots.txt",
    "/site.webmanifest",
    "/web-app-manifest-192x192.png",
    "/web-app-manifest-512x512.png",
    "/images-cache/*",
    "/fonts/*",
    "/api/*",
    "/404",
    "/about",
    "/blog/*"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/falconiere/Projects/falconiere.io/.wrangler/tmp/pages-T5DIa5/bundledWorker-0.421740248579075.mjs";
import { isRoutingRuleMatch } from "/Users/falconiere/Projects/falconiere.io/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/Users/falconiere/Projects/falconiere.io/.wrangler/tmp/pages-T5DIa5/bundledWorker-0.421740248579075.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=vvstpls86oi.js.map
