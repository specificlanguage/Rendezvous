import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Heading,
    Text,
} from "@chakra-ui/react";
import { TripInfo } from "../../lib/types.ts";
import {
    TripDatesDisplay,
    TripLocationsDisplay,
    TripUsersDisplay,
} from "../TripInfoComponents.tsx";

interface InviteAcceptProps {
    inviteID: string;
    tripInfo: TripInfo;
    onSubmit: () => Promise<void>;
}

export default function InviteAccept(props: InviteAcceptProps) {
    const { tripInfo, onSubmit } = props;

    return (
        <Card>
            <CardHeader>
                <Heading as="h3" size="xl">
                    You've been invited to {tripInfo.tripName}!
                </Heading>
                <TripDatesDisplay
                    startDate={tripInfo.startDate}
                    endDate={tripInfo.endDate}
                />
                <TripLocationsDisplay locations={tripInfo.locations} />
                <TripUsersDisplay users={tripInfo.users} />
            </CardHeader>
            <CardBody>
                <Text>
                    You've been invited to <b>{tripInfo.tripName}</b> on
                    Rendezvous! If you didn't expect this, close this tab.
                    <br />
                    Sign up to coordinate travel with all your friends!
                </Text>
                <Center mt={5}>
                    <Button
                        onClick={onSubmit}
                        type="button"
                        size="lg"
                        colorScheme="purple"
                    >
                        Join {tripInfo.tripName}
                    </Button>
                </Center>
            </CardBody>
        </Card>
    );
}
