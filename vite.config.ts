import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("chakra")) {
                            return "chakra";
                        } else if (id.includes("date-fns")) {
                            return "date-fns";
                        } else if (id.includes("react")) {
                            return "react";
                        } else if (id.includes("firebase")) {
                            return "firebase";
                        } else {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    }
                },
            },
        },
    },
});
