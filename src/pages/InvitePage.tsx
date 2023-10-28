import { useNavigate, useParams } from "react-router-dom";
import { fetcher } from "../lib/fetch.ts";
import { FIREBASE_AUTH } from "../lib/firebase.ts";
import { useEffect, useState } from "react";
import { TripInfo } from "../lib/types.ts";
import { FullPageLoadingSpinner } from "../components/LoadingSpinner.tsx";
import InviteAccept from "../components/Invite/InviteAccept.tsx";
import {
    Card,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import SignupForm from "../components/Auth/SignupForm.tsx";
import LoginForm from "../components/Auth/LoginForm.tsx";

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
            const inviteInfo = await fetcher(`/trip/invite/${inviteID}`);
            if (inviteInfo.status == 404) {
                setTripInfo(null);
            }
            const info = await fetcher(
                `/trip?tripID=${inviteInfo.body.tripID}`,
            );
            return setTripInfo(info.body);
        };

        if (FIREBASE_AUTH.currentUser) {
            fetchData().catch((e) => console.log(e));
        }
    }, [inviteID]);

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
            <Card p={5} bg={"neutral-200"} _dark={{ bg: "neutral-900" }}>
                <Heading as="h3">You've been invited to a trip!</Heading>
                <Text>Before you can join, log in or sign up!</Text>
                <div className="mt-5">
                    <Tabs isFitted>
                        <TabList mb="1em">
                            <Tab>Log In</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <LoginForm onSubmit={() => {}} />
                            </TabPanel>
                            <TabPanel>
                                <SignupForm onSubmit={() => {}} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </Card>
        );
    }
}
