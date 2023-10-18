import React, { ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/firebase.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { AuthContext } from "./AuthContext.ts";
import { Box } from "@chakra-ui/react";

const auth = FIREBASE_AUTH;

interface AuthContextProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProps) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? (
                <Box position="relative" h="calc(100vh - 16rem)">
                    <LoadingSpinner />
                </Box>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
