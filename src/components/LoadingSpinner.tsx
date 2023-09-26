import { AbsoluteCenter, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <AbsoluteCenter>
            <Spinner
                size="xl"
                thickness="8px"
                emptyColor="gray.200"
                color="blue.500"
            />
        </AbsoluteCenter>
    );
}
