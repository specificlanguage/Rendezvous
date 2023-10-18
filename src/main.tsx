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
import AuthProvider from "./layouts/AuthProvider.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import CreateTripPage from "./pages/CreateTripPage.tsx";
import SingleTripPage from "./pages/SingleTripPage.tsx";

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
            <Route
                element={
                    <AuthProvider>
                        <Outlet />
                    </AuthProvider>
                }
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateTripPage />} />
                <Route path="/trip/:tripID" element={<SingleTripPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>,
);
