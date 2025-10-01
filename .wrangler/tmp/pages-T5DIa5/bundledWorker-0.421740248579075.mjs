var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import { renderers } from "./renderers.mjs";
import { c as createExports, s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_CiCi2pGF.mjs";
import { manifest } from "./manifest_FffmO6_6.mjs";
globalThis.process ??= {};
globalThis.process.env ??= {};
var serverIslandMap = /* @__PURE__ */ new Map();
var _page0 = /* @__PURE__ */ __name(() => import("./pages/404.astro.mjs"), "_page0");
var _page1 = /* @__PURE__ */ __name(() => import("./pages/about.astro.mjs"), "_page1");
var _page2 = /* @__PURE__ */ __name(() => import("./pages/api/cover/_filename_.astro.mjs"), "_page2");
var _page3 = /* @__PURE__ */ __name(() => import("./pages/api/og/_filename_.astro.mjs"), "_page3");
var _page4 = /* @__PURE__ */ __name(() => import("./pages/api/og-image.png.astro.mjs"), "_page4");
var _page5 = /* @__PURE__ */ __name(() => import("./pages/blog/posts/_---path_.astro.mjs"), "_page5");
var _page6 = /* @__PURE__ */ __name(() => import("./pages/index.astro.mjs"), "_page6");
var pageMap = /* @__PURE__ */ new Map([
  ["src/pages/404.astro", _page0],
  ["src/pages/about.astro", _page1],
  ["src/pages/api/cover/[filename].ts", _page2],
  ["src/pages/api/og/[filename].ts", _page3],
  ["src/pages/api/og-image.png.ts", _page4],
  ["src/pages/blog/posts/[...path].astro", _page5],
  ["src/pages/index.astro", _page6]
]);
var _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: /* @__PURE__ */ __name(() => import("./_noop-actions.mjs"), "actions"),
  middleware: /* @__PURE__ */ __name(() => import("./_astro-internal_middleware.mjs"), "middleware")
});
var _args = void 0;
var _exports = createExports(_manifest);
var __astrojsSsrVirtualEntry = _exports.default;
var _start = "start";
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
  serverEntrypointModule[_start](_manifest, _args);
}
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
//# sourceMappingURL=bundledWorker-0.421740248579075.mjs.map
