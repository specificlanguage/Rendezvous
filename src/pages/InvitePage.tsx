import { useNavigate, useParams } from "react-router-dom";
import { fetcher } from "../lib/fetch.ts";
import { FIREBASE_AUTH } from "../lib/firebase.ts";
import { useEffect, useState } from "react";
import { TripInfo } from "../lib/types.ts";
import { FullPageLoadingSpinner } from "../components/LoadingSpinner.tsx";
import InviteAccept from "../components/Invite/InviteAccept.tsx";
import { Card, Heading } from "@chakra-ui/react";

export default function InvitePage() {
    const { inviteID } = useParams();
    const navigate = useNavigate();
    const [tripInfo, setTripInfo] = useState<TripInfo | null | undefined>();

    async function inviteUser(): Promise<void> {
        const resp = await fetcher(`/trip/invite/${inviteID}`, {
            method: "PUT",
        });
        if (resp.status < 400) {
            navigate(`/trip/${resp.body.tripID}?invite=success`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const inviteInfo = await fetcher(`/invite/${inviteID}`);
            if (inviteInfo.status == 404) {
                setTripInfo(null);
            }
            const info = await fetcher(
                `/trip?tripID=${inviteInfo.body.tripID}`,
            );
            return setTripInfo(info.body);
        };

        fetchData().catch((e) => console.log(e));
    }, []);

    if (tripInfo === undefined) {
        return <FullPageLoadingSpinner />;
    } else if (tripInfo === null) {
        navigate("/");
    } else if (FIREBASE_AUTH.currentUser) {
        return (
            <InviteAccept
                inviteID={inviteID ?? ""}
                tripInfo={tripInfo}
                onSubmit={() => inviteUser()}
            />
        );
    } else {
        return (
            <Card>
                <Heading>Oops, unimplemented!</Heading>
            </Card>
        );
    }
}
