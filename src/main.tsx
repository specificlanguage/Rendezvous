import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";

import Layout from "./layouts/Layout.tsx";
import { AuthContextProvider } from "./context/AuthProvider.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import CreateTripPage from "./pages/CreateTripPage.tsx";
import SingleTripPage from "./pages/SingleTripPage.tsx";
import InvitePage from "./pages/InvitePage.tsx";

const theme = extendTheme({
    styles: {
        global: {
            html: {
                bg: "neutral-100",
                color: "neutral-900",
                minH: "calc(100vh)",
            },
        },
    },
    semanticTokens: {
        colors: {
            error: "red.500",
            success: "green.500",
            primary: "purple.600",
        },
    },
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={
                <Layout>
                    <Outlet />
                </Layout>
            }
        >
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateTripPage />} />
            <Route path="/trip/:tripID" element={<SingleTripPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/invite/:inviteID" element={<InvitePage />} />
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
        </ChakraProvider>
    </React.StrictMode>,
);
