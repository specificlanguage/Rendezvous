import LoginForm from "../components/Auth/LoginForm.tsx";
import SignupForm from "../components/Auth/SignupForm.tsx";
import {
    Card,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { FIREBASE_AUTH } from "../lib/firebase.ts";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        FIREBASE_AUTH.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    if (user === undefined) {
        return (
            <div className="mx-auto">
                <Spinner size="xl" />
            </div>
        );
    } else if (user) {
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
