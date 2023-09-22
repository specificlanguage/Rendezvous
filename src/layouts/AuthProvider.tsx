import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseApp } from "../lib/firebase.ts";
import { redirect } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AuthProvider(props: Props) {
    const { children } = props;
    const auth = getAuth(FirebaseApp);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            return redirect("/signup");
        }
    });

    return <>{children}</>;
}
