import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TripDashboardView from "../components/TripViews/TripDashboard/TripDashboardView.tsx";
import { fetcher } from "../lib/fetch.ts";
import { useEffect, useState } from "react";
import { TripInfo } from "../lib/types.ts";
import { FullPageLoadingSpinner } from "../components/LoadingSpinner.tsx";
import { useStore } from "zustand";
import { tripStore } from "../lib/stores.ts";
import { createStandaloneToast } from "@chakra-ui/react";
import { APP_THEME } from "../lib/styles.ts";

export default function SingleTripPage() {
    const { tripID } = useParams();
    const navigate = useNavigate();

    const [tripData, setData] = useState<TripInfo>();
    const setTrip = useStore(tripStore, (s) => s.setTrip);

    const [searchParams] = useSearchParams();
    const { toast } = createStandaloneToast({ theme: APP_THEME });
    const toastID = "invite-success";

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
        return <FullPageLoadingSpinner />;
    }

    if (searchParams.get("invite") == "success" && !toast.isActive(toastID)) {
        toast({
            id: toastID,
            title: `Invited to ${tripData?.tripName}!`,
            description: "Happy travels!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    }

    return <TripDashboardView tripData={tripData} />;
}
