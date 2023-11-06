import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    Stack,
} from "@chakra-ui/react";
import { TripInfo } from "../../../lib/types.ts";
import {
    TripDatesDisplay,
    TripLocationsDisplay,
    TripUsersDisplay,
} from "../../TripInfoComponents.tsx";

export interface TripHomeViewProps {
    tripData: TripInfo;
}

function DashboardBasicInfoCard(props: TripHomeViewProps) {
    const { tripData } = props;

    return (
        <Card>
            <CardHeader>
                <Heading as="h2" size="lg">
                    {tripData.tripName}
                </Heading>
            </CardHeader>
            <CardBody>
                <TripDatesDisplay
                    startDate={tripData.startDate}
                    endDate={tripData.endDate}
                    style="text-neutral-500"
                />
                <TripLocationsDisplay
                    locations={tripData.locations}
                    style="text-neutral-500"
                />
                <TripUsersDisplay users={tripData.users} />
            </CardBody>
        </Card>
    );
}

function DashboardPeopleCard(props: TripHomeViewProps) {
    const { tripData } = props;

    return (
        <Card p={0}>
            <CardHeader mb={0}>
                <Heading as="h2" size="md" m={0}>
                    Who's Coming?
                </Heading>
            </CardHeader>
            <CardBody m={0}>
                <Stack spacing={2}>
                    {tripData.users.map((user) => (
                        <HStack key={user.id}>
                            <Avatar
                                size="md"
                                name={user.name}
                                src={user.imageURL}
                            />
                            <Stack spacing={0.5}>
                                <Text fontSize="lg">{user.name}</Text>
                                <Text
                                    fontSize="sm"
                                    className="text-neutral-700"
                                >
                                    {user.email}
                                </Text>
                            </Stack>
                        </HStack>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
}

export default function TripDashboardView(props: TripHomeViewProps) {
    return (
        <div>
            <Heading as={"h2"} my={4}>
                Dashboard
            </Heading>
            <SimpleGrid columns={[1, null, 2]} spacing={"40px"}>
                {/* LEFT COLUMN */}
                <Stack>
                    <DashboardBasicInfoCard tripData={props.tripData} />
                </Stack>
                {/* RIGHT COLUMN */}
                <Stack>
                    <DashboardPeopleCard tripData={props.tripData} />
                </Stack>
            </SimpleGrid>
        </div>
    );
}
