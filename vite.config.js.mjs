var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// tailwind.config.cjs
var require_tailwind_config = __commonJS({
  "tailwind.config.cjs"(exports, module) {
    var defaultTheme = __require("tailwindcss/defaultTheme");
    module.exports = {
      mode: "jit",
      enabled: process.env.NODE_ENV === "production",
      safeList: [],
      content: [
        "./index.html",
        "./src/**/*.{vue,js,ts}"
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: ["Inter var", ...defaultTheme.fontFamily.sans]
          }
        }
      }
    };
  }
});

// vite.config.js
import { defineConfig } from "vite";

// postcss.config.js
var import_tailwind_config = __toESM(require_tailwind_config(), 1);
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
var postcss_config_default = {
  plugins: [tailwind(import_tailwind_config.default), autoprefixer]
};

// vite.config.js
import vuePlugin from "@vitejs/plugin-vue";
import { resolve } from "path";
var srcPath = resolve(process.cwd(), "src");
var dev = process.env.NODE_ENV !== "production";
var vite_config_default = defineConfig({
  plugins: [
    vuePlugin()
  ],
  build: {
    assetsDir: "assets",
    outDir: "dist",
    minify: !dev
  },
  resolve: {
    alias: {
      "@": srcPath
    }
  },
  css: {
    postcss: postcss_config_default
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGFpbHdpbmQuY29uZmlnLmNqcyIsICJ2aXRlLmNvbmZpZy5qcyIsICJwb3N0Y3NzLmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9idXNzdXJ5L0NvZGUtc2lkZS1wcm9qZWN0cy92aXRlLWZhc3RpZnktZ3VpZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9idXNzdXJ5L0NvZGUtc2lkZS1wcm9qZWN0cy92aXRlLWZhc3RpZnktZ3VpZGUvdGFpbHdpbmQuY29uZmlnLmNqc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYnVzc3VyeS9Db2RlLXNpZGUtcHJvamVjdHMvdml0ZS1mYXN0aWZ5LWd1aWRlL3RhaWx3aW5kLmNvbmZpZy5janNcIjtcbmNvbnN0IGRlZmF1bHRUaGVtZSA9IHJlcXVpcmUoJ3RhaWx3aW5kY3NzL2RlZmF1bHRUaGVtZScpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb2RlOiAnaml0JyxcbiAgZW5hYmxlZDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcbiAgc2FmZUxpc3Q6IFtdLFxuICBjb250ZW50OiBbXG4gICAgJy4vaW5kZXguaHRtbCcsXG4gICAgJy4vc3JjLyoqLyoue3Z1ZSxqcyx0c30nLFxuICAgIC8vIGV0Yy5cbiAgXSxcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHtcbiAgICAgIGZvbnRGYW1pbHk6IHtcbiAgICAgICAgc2FuczogWydJbnRlciB2YXInLCAuLi5kZWZhdWx0VGhlbWUuZm9udEZhbWlseS5zYW5zXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9idXNzdXJ5L0NvZGUtc2lkZS1wcm9qZWN0cy92aXRlLWZhc3RpZnktZ3VpZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9idXNzdXJ5L0NvZGUtc2lkZS1wcm9qZWN0cy92aXRlLWZhc3RpZnktZ3VpZGUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2J1c3N1cnkvQ29kZS1zaWRlLXByb2plY3RzL3ZpdGUtZmFzdGlmeS1ndWlkZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHBvc3Rjc3MgZnJvbSAnLi9wb3N0Y3NzLmNvbmZpZy5qcyc7XG5pbXBvcnQgdnVlUGx1Z2luIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAncGF0aCc7XG5cbmNvbnN0IHNyY1BhdGggPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMnKTtcbmNvbnN0IGRldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczpbXG4gICAgICAgIHZ1ZVBsdWdpbigpLFxuICAgIF0sXG4gICAgYnVpbGQ6e1xuICAgICAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxuICAgICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAgICAgbWluaWZ5OiAhZGV2LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICdAJzogc3JjUGF0aCxcbiAgICAgICAgfSxcbiAgIH0sXG4gICBjc3M6e1xuICAgIHBvc3Rjc3NcbiAgfVxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9idXNzdXJ5L0NvZGUtc2lkZS1wcm9qZWN0cy92aXRlLWZhc3RpZnktZ3VpZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9idXNzdXJ5L0NvZGUtc2lkZS1wcm9qZWN0cy92aXRlLWZhc3RpZnktZ3VpZGUvcG9zdGNzcy5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2J1c3N1cnkvQ29kZS1zaWRlLXByb2plY3RzL3ZpdGUtZmFzdGlmeS1ndWlkZS9wb3N0Y3NzLmNvbmZpZy5qc1wiO2ltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gJy4vdGFpbHdpbmQuY29uZmlnLmNqcydcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBsdWdpbnM6IFt0YWlsd2luZCh0YWlsd2luZENvbmZpZyksIGF1dG9wcmVmaXhlcl0sXG59XG4vLyBleHBvcnQgY29uc3QgcGx1Z2lucyA9IHtcbi8vICAgdGFpbHdpbmRjc3M6IHt9LFxuLy8gICBhdXRvcHJlZml4ZXI6IHt9LFxuLy8gfTtcblxuLy8gLy8gbW9kdWxlLmV4cG9ydHMgPSB7XG4vLyAvLyAgIHBsdWdpbnM6IHtcbi8vIC8vICAgICB0YWlsd2luZGNzczoge30sXG4vLyAvLyAgICAgYXV0b3ByZWZpeGVyOiB7fSxcbi8vIC8vICAgfSxcbi8vIC8vIH0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0EsUUFBTSxlQUFlLFVBQVE7QUFFN0IsV0FBTyxVQUFVO0FBQUEsTUFDZixNQUFNO0FBQUEsTUFDTixTQUFTLFFBQVEsSUFBSSxhQUFhO0FBQUEsTUFDbEMsVUFBVSxDQUFDO0FBQUEsTUFDWCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxNQUVGO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixZQUFZO0FBQUEsWUFDVixNQUFNLENBQUMsYUFBYSxHQUFHLGFBQWEsV0FBVyxJQUFJO0FBQUEsVUFDckQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUNuQjhVOzs7QUNFOVUsNkJBQTJCO0FBRnlUO0FBQ3BWO0FBSUEsSUFBTyx5QkFBUTtBQUFBLEVBQ2IsU0FBUyxDQUFDLFNBQVMsOEJBQWMsR0FBRyxZQUFZO0FBQ2xEOzs7QURMQTtBQUNBO0FBRUEsSUFBTSxVQUFVLFFBQVEsUUFBUSxJQUFJLEdBQUcsS0FBSztBQUM1QyxJQUFNLE1BQU0sUUFBUSxJQUFJLGFBQWE7QUFDckMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUTtBQUFBLElBQ0osVUFBVTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLE9BQU07QUFBQSxJQUNGLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFFBQVEsQ0FBQztBQUFBLEVBQ2I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDTDtBQUFBLEVBQ0EsS0FBSTtBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
