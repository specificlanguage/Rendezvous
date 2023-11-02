import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Heading,
    Text,
} from "@chakra-ui/react";
import { TripInfo, UserInfo } from "../../lib/types.ts";
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

const TEMP_USER: UserInfo = {
    id: "",
    name: "",
};

export default function InviteAccept(props: InviteAcceptProps) {
    const { tripInfo, onSubmit } = props;

    let newLength = 0;
    if (tripInfo.numUsers) {
        newLength = tripInfo.numUsers - 1;
    }

    const unknownUsers: UserInfo[] = Array(newLength).fill(
        TEMP_USER,
    ) as UserInfo[];

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
                <TripUsersDisplay users={tripInfo.users.concat(unknownUsers)} />
            </CardHeader>
            <CardBody>
                <Text>
                    You've been invited to <b>{tripInfo.tripName}</b> on
                    Rendezvous! If you didn't expect this, close this tab.
                    <br />
                    Join to coordinate travel with all your friends!
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
