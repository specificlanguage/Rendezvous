import { useNavigate, useParams } from "react-router-dom";
import TripDashboardView from "../components/TripViews/TripDashboard/TripDashboardView.tsx";
import { fetcher } from "../lib/fetch.ts";
import { useEffect, useState } from "react";
import { TripInfo } from "../lib/types.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { Box } from "@chakra-ui/react";
import { useStore } from "zustand";
import { tripStore } from "../lib/stores.ts";

export default function SingleTripPage() {
    const { tripID } = useParams();
    const navigate = useNavigate();

    const [tripData, setData] = useState<TripInfo>();
    const setTrip = useStore(tripStore, (s) => s.setTrip);

    useEffect(() => {
        if (!tripID) {
            navigate("/");
        }

        const fetchData = async () => {
            const info = await fetcher(`/trip?tripID=${tripID}`);
            if (info.status >= 400) {
                navigate("/");
            }
            setData(info.body);
            setTrip(info.body);
        };

        fetchData().catch((e) => {
            console.log(e);
            navigate("/");
        });
    }, [tripID]);

    if (!tripData) {
        return (
            <Box position="relative" h="calc(100vh - 16rem)">
                <LoadingSpinner />
            </Box>
        );
    }

    return <TripDashboardView tripData={tripData} />;
}
