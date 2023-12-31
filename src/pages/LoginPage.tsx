import LoginForm from "../components/Auth/LoginForm.tsx";
import SignupForm from "../components/Auth/SignupForm.tsx";
import {
    Card,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.ts";

export default function LoginPage() {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <Card p={5} bg={"neutral-200"} _dark={{ bg: "neutral-900" }}>
            <div>
                <Tabs isFitted>
                    <TabList mb="1em">
                        <Tab>Log In</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LoginForm />
                        </TabPanel>
                        <TabPanel>
                            <SignupForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Card>
    );
}
