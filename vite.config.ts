import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import eslint from "vite-plugin-eslint2"
import * as path from "node:path";
import {type ConfigEnv, defineConfig, loadEnv} from "vite";

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "VITE_")
  const context = `/${env.VITE_FE_CONTEXT || ""}`
  const apiPath = `/${env.VITE_FE_CONTEXT || ""}/api`
  const host = env.VITE_FE_HOST || "localhost"
  const port = Number(env.VITE_FE_PORT) || 3002
  const reverseProxyHost = env.VITE_REVERSE_PROXY_HOST
  const bePort = env.VITE_BE_PORT
  const beContext = env.VITE_BE_CONTEXT


  return {
    plugins: [
      react(),
      tsconfigPaths({ root: __dirname }),
      eslint({
        include: [
          "**/*.ts",
          "**/*.tsx",
          "**/*.js",
          "**/*.jsx",
          "**/*.json",
          "**/*.html"
        ],
        exclude: [
          "**/*.svg",
          "**/*.png",
          "**/*.jpeg",
          "**/*.jpg",
          "**/*.yaml",
          "**/*.yml",
          "public",
          "test-report",
          "**/external-uikit/*"
        ]
      })
    ],
    resolve: {
      alias: {
        Css: path.resolve("src/external-uikit/css"),
        Img: path.resolve("src/external-uikit/img"),
        Js: path.resolve("src/external-uikit/js"),
        Reducers: path.resolve("src/store/reducers"),
        Model: path.resolve("src/model"),
        Store: path.resolve("src/store"),
        Api: path.resolve("src/api"),
        Utils: path.resolve("src/utils"),
        Containers: path.resolve("src/containers"),
        Components: path.resolve("src/components")
      }
    },
    define: {
      __CONTEXT_PATH__: JSON.stringify(context),
      __API_PATH__: JSON.stringify(apiPath),
      __HOST__: JSON.stringify(host),
      __PORT__: JSON.stringify(port)
    },
    build: {
      manifest: true,
      outDir: "public",
      assetsDir: "dist",
      emptyOutDir: true,
      cssMinify: true,
      chunkSizeWarningLimit: 5000,
    },
    server: {
      host,
      port,
      open: `/${env.VITE_FE_CONTEXT}`,
      proxy: {
        [apiPath]: {
          target: `http://${reverseProxyHost}:${bePort}`,
          secure: false,
          pathRewrite: { [apiPath]: `/${beContext}/api` }
        }
      },
      strictPort: true
    },
    publicDir: path.resolve(__dirname, "public"),
    base: context
  }
})
