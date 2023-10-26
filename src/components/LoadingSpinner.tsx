import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <AbsoluteCenter>
            <Spinner
                size="xl"
                thickness="8px"
                emptyColor="gray.200"
                color="purple.500"
            />
        </AbsoluteCenter>
    );
}

export function FullPageLoadingSpinner() {
    return (
        <Box position="relative" h="calc(100vh - 16rem)">
            <LoadingSpinner />
        </Box>
    );
}
