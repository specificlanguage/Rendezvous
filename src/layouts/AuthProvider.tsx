import { ReactNode, useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../lib/firebase.ts";
import { Spinner } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";

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
            <div className="mx-auto">
                <Spinner size="xl" />
            </div>
        );
    } else if (user) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" />;
    }
}
