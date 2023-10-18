import { useAuthContext } from "../context/AuthContext.ts";
import { Navigate } from "react-router-dom";
import React from "react";

interface ChildrenProps {
    children: React.ReactNode;
}

export function AuthProtectedRoute(props: ChildrenProps) {
    const { user } = useAuthContext();
    if (user == null) {
        return <Navigate to="/login" />;
    }
    return <>{props.children}</>;
}
