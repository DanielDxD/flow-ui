/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "FlowUI",
            fileName: (format) => `flow-ui.${format}.js`
        },
        rollupOptions: {
            // Make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {}
            }
        }
    },
    plugins: [dts({ insertTypesEntry: true })],
    test: {
        globals: true,
        environment: "jsdom",
        include: ["src/**/*.test.ts"],
        setupFiles: ["./src/test/setup.ts"]
    }
});
