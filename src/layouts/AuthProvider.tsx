import { ReactNode, useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../lib/firebase.ts";
import { Box } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

interface Props {
    children: ReactNode;
}

export default function AuthProvider(props: Props) {
    const { children } = props;
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        FIREBASE_AUTH.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    if (user === undefined) {
        return (
            <Box position="relative" h="calc(100vh - 16rem)">
                <LoadingSpinner />
            </Box>
        );
    } else if (user != null) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />;
    }
}
