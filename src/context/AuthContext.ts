import React from "react";
import { User } from "firebase/auth";

export const AuthContext = React.createContext<AuthContextInterface>({
    user: null,
});
export const useAuthContext = () => React.useContext(AuthContext);

interface AuthContextInterface {
    user: User | null;
}
