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
import { SignupPage } from "./pages/SignupPage.tsx";
import { Layout } from "./layouts/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bgGradient: "linear(to-b, #FFF, #C38D01)",
                color: "neutral-900",
                h: "calc(100vh)",
                _dark: {
                    color: "neutral-200",
                    bgGradient: "linear(to-br, #323638, #162B60)",
                },
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
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<SignupPage />} />
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
