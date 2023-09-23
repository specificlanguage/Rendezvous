import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
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
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthProvider from "./layouts/AuthProvider.tsx";

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
            errorElement={
                <Layout>
                    <ErrorPage />
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
                <Route path="/" element={<App />} />
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
