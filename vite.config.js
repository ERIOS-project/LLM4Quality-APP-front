import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({
            babel: {
                plugins: [['babel-plugin-react-compiler', { target: '19' }]],
            }
        })],
    server: {
        open: true,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/setupTests",
        mockReset: true,
    },
});
