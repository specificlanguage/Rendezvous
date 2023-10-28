import { extendTheme } from "@chakra-ui/react";

export const APP_THEME = extendTheme({
    styles: {
        global: {
            html: {
                bg: "neutral-100",
                color: "neutral-900",
                minH: "calc(100vh)",
            },
        },
    },
    semanticTokens: {
        colors: {
            error: "red.500",
            success: "green.500",
            primary: "purple.600",
        },
    },
});
