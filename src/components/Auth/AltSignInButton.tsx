import { SimpleGrid } from "@chakra-ui/react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebase.ts";
import { fetcher } from "../../lib/fetch.ts";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
    const navigate = useNavigate();

    async function SignIn() {
        const provider = new GoogleAuthProvider();
        let isError = false;
        await signInWithPopup(FIREBASE_AUTH, provider).catch((error) => {
            console.log(error);
            isError = true;
        });

        if (isError || FIREBASE_AUTH.currentUser == null) {
            return;
        }

        const name = FIREBASE_AUTH.currentUser.displayName ?? ""; // In Google Authentication, it will be present.

        await fetcher(`/user/signup`, {
            method: "POST",
            body: JSON.stringify({ name }),
        }).then(async (resp) => {
            if (resp.status == 500) {
                await fetcher(`/user/`).then((resp) => {
                    localStorage.setItem("name", resp.body.name);
                });
            } else {
                localStorage.setItem("name", resp.body.name);
            }
            navigate("/");
        });
    }

    return (
        <GoogleLoginButton onClick={SignIn}>
            <span>Log in with Google</span>
        </GoogleLoginButton>
    );
}

export default function AltSignIns() {
    return (
        <SimpleGrid columns={2} spacing={4}>
            <GoogleLogin />
        </SimpleGrid>
    );
}
