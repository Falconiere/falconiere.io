globalThis.process ??= {}; globalThis.process.env ??= {};
import { v as decodeKey } from './chunks/astro/server_TWEty7EK.mjs';
import './chunks/astro-designed-error-pages_CMtUXjif.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BSBe5mr_.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/falconiere/Projects/falconiere.io/","cacheDir":"file:///Users/falconiere/Projects/falconiere.io/node_modules/.astro/","outDir":"file:///Users/falconiere/Projects/falconiere.io/dist/","srcDir":"file:///Users/falconiere/Projects/falconiere.io/src/","publicDir":"file:///Users/falconiere/Projects/falconiere.io/public/","buildClientDir":"file:///Users/falconiere/Projects/falconiere.io/dist/","buildServerDir":"file:///Users/falconiere/Projects/falconiere.io/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"about.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"api/og-image.png","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/og-image.png","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/og-image\\.png\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"og-image.png","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/og-image.png.ts","pathname":"/api/og-image.png","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"site":"https://falconiere.io","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["/Users/falconiere/Projects/falconiere.io/src/pages/blog/posts/[...path].astro",{"propagation":"in-tree","containsHead":true}],["/Users/falconiere/Projects/falconiere.io/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["/Users/falconiere/Projects/falconiere.io/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["/Users/falconiere/Projects/falconiere.io/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/falconiere/Projects/falconiere.io/src/layouts/BlogPostLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/posts/[...path]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/falconiere/Projects/falconiere.io/src/pages/api/cover/[filename].ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/api/cover/[filename]@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/falconiere/Projects/falconiere.io/src/pages/api/og/[filename].ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/api/og/[filename]@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/falconiere/Projects/falconiere.io/src/utils/getHeadOpenGraph.ts",{"propagation":"in-tree","containsHead":false}],["/Users/falconiere/Projects/falconiere.io/src/components/Head.astro",{"propagation":"in-tree","containsHead":false}],["/Users/falconiere/Projects/falconiere.io/src/layouts/MainLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/cover/[filename]@_@ts":"pages/api/cover/_filename_.astro.mjs","\u0000@astro-page:src/pages/api/og/[filename]@_@ts":"pages/api/og/_filename_.astro.mjs","\u0000@astro-page:src/pages/api/og-image.png@_@ts":"pages/api/og-image.png.astro.mjs","\u0000@astro-page:src/pages/blog/posts/[...path]@_@astro":"pages/blog/posts/_---path_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_FffmO6_6.mjs","/Users/falconiere/Projects/falconiere.io/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Users/falconiere/Projects/falconiere.io/.astro/content-assets.mjs":"chunks/content-assets_XqCgPAV2.mjs","/Users/falconiere/Projects/falconiere.io/.astro/content-modules.mjs":"chunks/content-modules_Bvq7llv8.mjs","/Users/falconiere/Projects/falconiere.io/node_modules/@astrojs/cloudflare/dist/entrypoints/image-service.js":"chunks/image-service_CHRKJFeo.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_B67TOlX6.mjs","/Users/falconiere/Projects/falconiere.io/node_modules/yoga-wasm-web/dist/asm.js":"chunks/asm_CG2Xu2zF.mjs","@astrojs/react/client.js":"_astro/client.CF9sKolA.js","/Users/falconiere/Projects/falconiere.io/src/layouts/BlogPostLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BlogPostLayout.astro_astro_type_script_index_0_lang.BtufuTKd.js","/Users/falconiere/Projects/falconiere.io/src/components/SocialLinks.astro?astro&type=script&index=0&lang.ts":"_astro/SocialLinks.astro_astro_type_script_index_0_lang.Csqu-0wR.js","/Users/falconiere/Projects/falconiere.io/src/components/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.CQg6GqVr.js","/Users/falconiere/Projects/falconiere.io/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.Dz4H34Bu.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/falconiere/Projects/falconiere.io/src/components/Footer.astro?astro&type=script&index=0&lang.ts","window.dataLayer=window.dataLayer||[];function a(){dataLayer.push(arguments)}a(\"js\",new Date);a(\"config\",\"G-SPZVQVXY62\");"]],"assets":["/_astro/avatar.q2Cw7Ty8.png","/_astro/astronaut-headshot-closeup.sPmaWMSh.jpeg","/_astro/beach-woman-shadow.CUFatxHa.webp","/_astro/cover-2022.Bbx7RHKB.webp","/_astro/cover-software-developer.DpMzl8dy.webp","/_astro/logo.B7-WgRGS.png","/_astro/cover-time-art.1_Oucbtm.webp","/_astro/navigating-modern-life-sora.B72SXxGa.png","/_astro/hope-through-nostalgia-simple-compose-sept-25-2025.DhVMs4Wp.png","/_astro/tailwind.DcgBR053.css","/apple-touch-icon.png","/favicon-96x96.png","/favicon.ico","/favicon.svg","/robots.txt","/site.webmanifest","/web-app-manifest-192x192.png","/web-app-manifest-512x512.png","/_astro/BlogPostLayout.astro_astro_type_script_index_0_lang.BtufuTKd.js","/_astro/Navigation.astro_astro_type_script_index_0_lang.Dz4H34Bu.js","/_astro/SocialLinks.astro_astro_type_script_index_0_lang.Csqu-0wR.js","/_astro/client.CF9sKolA.js","/_astro/lucide.CgHCTXR-.js","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/_noop-actions.mjs","/_worker.js/index.js","/_worker.js/renderers.mjs","/images-cache/astronaut-headshot-closeup.6d85e252a2.webp","/images-cache/beach-woman-shadow.6ff1039b0b.webp","/images-cache/cover-2022.86e077371c.webp","/images-cache/cover-software-developer.07c3f73a6a.webp","/images-cache/cover-time-art.543d1892ad.webp","/images-cache/hope-through-nostalgia-simple-compose-sept-25-2025.25a04c174e.webp","/images-cache/logo.13b65a8f1e.webp","/images-cache/navigating-modern-life-sora.0273fbf6f0.webp","/_worker.js/_astro/astronaut-headshot-closeup.sPmaWMSh.jpeg","/_worker.js/_astro/avatar.q2Cw7Ty8.png","/_worker.js/_astro/beach-woman-shadow.CUFatxHa.webp","/_worker.js/_astro/cover-2022.Bbx7RHKB.webp","/_worker.js/_astro/cover-software-developer.DpMzl8dy.webp","/_worker.js/_astro/cover-time-art.1_Oucbtm.webp","/_worker.js/_astro/hope-through-nostalgia-simple-compose-sept-25-2025.DhVMs4Wp.png","/_worker.js/_astro/logo.B7-WgRGS.png","/_worker.js/_astro/navigating-modern-life-sora.B72SXxGa.png","/_worker.js/_astro/tailwind.DcgBR053.css","/_worker.js/pages/404.astro.mjs","/_worker.js/pages/about.astro.mjs","/_worker.js/pages/index.astro.mjs","/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf","/fonts/Inter/Inter-VariableFont_opsz,wght.ttf","/fonts/Inter/OFL.txt","/fonts/Inter/README.txt","/_worker.js/chunks/Head_DrWRzKB6.mjs","/_worker.js/chunks/Link_CAiTJkHx.mjs","/_worker.js/chunks/MainLayout_CHTVk-Qm.mjs","/_worker.js/chunks/PostTimeInfo_D9Q6h19i.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_CiCi2pGF.mjs","/_worker.js/chunks/_astro_assets_BW4XIb4e.mjs","/_worker.js/chunks/_astro_content_JWtgRv0a.mjs","/_worker.js/chunks/_astro_data-layer-content_B67TOlX6.mjs","/_worker.js/chunks/_path_.631ab4e0_CtpOKDZa.mjs","/_worker.js/chunks/asm_CG2Xu2zF.mjs","/_worker.js/chunks/astro-designed-error-pages_CMtUXjif.mjs","/_worker.js/chunks/astro_CHM4K_h2.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/content-assets_XqCgPAV2.mjs","/_worker.js/chunks/content-modules_Bvq7llv8.mjs","/_worker.js/chunks/defaultMetaDescription_B8oaPtg0.mjs","/_worker.js/chunks/generateOGImage_DvtMsbco.mjs","/_worker.js/chunks/image-service_CHRKJFeo.mjs","/_worker.js/chunks/index_DyrBnozT.mjs","/_worker.js/chunks/noop-middleware_BSBe5mr_.mjs","/_worker.js/chunks/parse_yL_293SP.mjs","/_worker.js/chunks/path_C0V2xYQr.mjs","/_worker.js/pages/api/og-image.png.astro.mjs","/_worker.js/chunks/astro/server_TWEty7EK.mjs","/fonts/Inter/static/Inter_18pt-Black.ttf","/fonts/Inter/static/Inter_18pt-BlackItalic.ttf","/fonts/Inter/static/Inter_18pt-Bold.ttf","/fonts/Inter/static/Inter_18pt-BoldItalic.ttf","/fonts/Inter/static/Inter_18pt-ExtraBold.ttf","/fonts/Inter/static/Inter_18pt-ExtraBoldItalic.ttf","/fonts/Inter/static/Inter_18pt-ExtraLight.ttf","/fonts/Inter/static/Inter_18pt-ExtraLightItalic.ttf","/fonts/Inter/static/Inter_18pt-Italic.ttf","/fonts/Inter/static/Inter_18pt-Light.ttf","/fonts/Inter/static/Inter_18pt-LightItalic.ttf","/fonts/Inter/static/Inter_18pt-Medium.ttf","/fonts/Inter/static/Inter_18pt-MediumItalic.ttf","/fonts/Inter/static/Inter_18pt-Regular.ttf","/fonts/Inter/static/Inter_18pt-SemiBold.ttf","/fonts/Inter/static/Inter_18pt-SemiBoldItalic.ttf","/fonts/Inter/static/Inter_18pt-Thin.ttf","/fonts/Inter/static/Inter_18pt-ThinItalic.ttf","/fonts/Inter/static/Inter_24pt-Black.ttf","/fonts/Inter/static/Inter_24pt-BlackItalic.ttf","/fonts/Inter/static/Inter_24pt-Bold.ttf","/fonts/Inter/static/Inter_24pt-BoldItalic.ttf","/fonts/Inter/static/Inter_24pt-ExtraBold.ttf","/fonts/Inter/static/Inter_24pt-ExtraBoldItalic.ttf","/fonts/Inter/static/Inter_24pt-ExtraLight.ttf","/fonts/Inter/static/Inter_24pt-ExtraLightItalic.ttf","/fonts/Inter/static/Inter_24pt-Italic.ttf","/fonts/Inter/static/Inter_24pt-Light.ttf","/fonts/Inter/static/Inter_24pt-LightItalic.ttf","/fonts/Inter/static/Inter_24pt-Medium.ttf","/fonts/Inter/static/Inter_24pt-MediumItalic.ttf","/fonts/Inter/static/Inter_24pt-Regular.ttf","/fonts/Inter/static/Inter_24pt-SemiBold.ttf","/fonts/Inter/static/Inter_24pt-SemiBoldItalic.ttf","/fonts/Inter/static/Inter_24pt-Thin.ttf","/fonts/Inter/static/Inter_24pt-ThinItalic.ttf","/fonts/Inter/static/Inter_28pt-Black.ttf","/fonts/Inter/static/Inter_28pt-BlackItalic.ttf","/fonts/Inter/static/Inter_28pt-Bold.ttf","/fonts/Inter/static/Inter_28pt-BoldItalic.ttf","/fonts/Inter/static/Inter_28pt-ExtraBold.ttf","/fonts/Inter/static/Inter_28pt-ExtraBoldItalic.ttf","/fonts/Inter/static/Inter_28pt-ExtraLight.ttf","/fonts/Inter/static/Inter_28pt-ExtraLightItalic.ttf","/fonts/Inter/static/Inter_28pt-Italic.ttf","/fonts/Inter/static/Inter_28pt-Light.ttf","/fonts/Inter/static/Inter_28pt-LightItalic.ttf","/fonts/Inter/static/Inter_28pt-Medium.ttf","/fonts/Inter/static/Inter_28pt-MediumItalic.ttf","/fonts/Inter/static/Inter_28pt-Regular.ttf","/fonts/Inter/static/Inter_28pt-SemiBold.ttf","/fonts/Inter/static/Inter_28pt-SemiBoldItalic.ttf","/fonts/Inter/static/Inter_28pt-Thin.ttf","/fonts/Inter/static/Inter_28pt-ThinItalic.ttf","/_worker.js/pages/api/cover/_filename_.astro.mjs","/_worker.js/pages/api/og/_filename_.astro.mjs","/_worker.js/pages/blog/posts/_---path_.astro.mjs","/404.html","/about.html","/api/og-image.png","/index.html"],"buildFormat":"file","checkOrigin":true,"serverIslandNameMap":[],"key":"VIVfSvLtQ1Ujoo1Q6pT4whRLwoO6vCFj1LTWOeYTXv4=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
