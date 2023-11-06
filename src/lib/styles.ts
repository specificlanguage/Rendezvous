import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys);

const cardStyle = definePartsStyle({
    header: {
        padding: "1rem 1rem 0 1rem",
    },
    body: {
        padding: "1rem",
    },
});

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
    components: {
        Card: defineMultiStyleConfig({ baseStyle: cardStyle }),
    },
});
