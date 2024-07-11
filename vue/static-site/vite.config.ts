import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vueDevTools(),
    vuetify(),
    AutoImport({
      // https://github.com/unplugin/unplugin-auto-import?tab=readme-ov-file#configuration
      include: [/\.vue$/],
      imports: [
        {
          from: "vue",
          imports: ["ref", "reactive", "computed", "watch", "watchEffect"]
        }
      ],
      dts: "./auto-imports.d.ts"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
