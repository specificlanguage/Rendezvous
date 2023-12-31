import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ChakraProvider } from "@chakra-ui/react";
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
import ImportFlightPage from "./pages/ImportFlightPage.tsx";
import { APP_THEME } from "./lib/styles.ts";
import FlightPage from "./pages/FlightPage.tsx";

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
            <Route path="/trip/:tripID">
                <Route index element={<SingleTripPage />} />
                <Route path="flights">
                    <Route index element={<FlightPage />} />
                    <Route path="import" element={<ImportFlightPage />} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/invite/:inviteID" element={<InvitePage />} />
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={APP_THEME}>
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
        </ChakraProvider>
    </React.StrictMode>,
);
