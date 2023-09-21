import "./index.css";
import { Skeleton, Stack } from "@chakra-ui/react";
import { Layout } from "./layouts/Layout.tsx";

function App() {
    return (
        <Layout>
            <Stack>
                <Skeleton height="50px" width="100px" />
            </Stack>
        </Layout>
    );
}

export default App;
