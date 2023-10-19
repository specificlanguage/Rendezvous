import {
    AbsoluteCenter,
    Box,
    Card,
    Heading,
    Icon,
    Link as ChakraLink,
    Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import {
    TripDatesDisplay,
    TripLocationsDisplay,
    TripUsersDisplay,
} from "../../TripInfoComponents.tsx";
import { UserInfo } from "../../../lib/types.ts";

interface TripViewCardProps {
    id: string;
    tripName: string;
    tripImage?: string;
    adminID: string;
    created: string;
    startDate: string;
    endDate: string;
    locations: string[];
    users: UserInfo[];
}

interface TripCardsProps {
    cardProps: TripViewCardProps[];
}

function TripViewCard(props: TripViewCardProps) {
    const { id, tripName, startDate, endDate, locations, users } = props;

    return (
        <ChakraLink
            as={RouterLink}
            to={`/trip/${id}`}
            role="group"
            _hover={{ textDecoration: "none" }}
        >
            <Card
                p={4}
                bg="white"
                h="200"
                _hover={{ bgColor: "#fafafa", shadow: "lg" }}
            >
                <Heading as="h2" size="xl" my={2}>
                    {tripName}
                </Heading>
                <Box color="gray.500">
                    <TripDatesDisplay
                        startDate={startDate}
                        endDate={endDate}
                        css="text-neutral-500"
                    />
                    <TripLocationsDisplay
                        locations={locations}
                        css="text-neutral-500"
                    />
                    <TripUsersDisplay users={users} />
                </Box>
            </Card>
        </ChakraLink>
    );
}

function CreateTripCard() {
    return (
        <ChakraLink as={RouterLink} to="/create">
            <Card
                p={6}
                bg="white"
                h="200"
                variant={"outline"}
                borderStyle={"dashed"}
                _hover={{ bgColor: "#fcfcfc" }}
            >
                <AbsoluteCenter>
                    <Heading as="h4" size="xl" textColor="grey">
                        <Icon as={FaPlus} mb={2} /> New Trip
                    </Heading>
                </AbsoluteCenter>
            </Card>
        </ChakraLink>
    );
}

export default function TripViewCards(props: TripCardsProps) {
    const { cardProps } = props;

    return (
        <Stack spacing={10} mb={8}>
            {cardProps.map((tripInfo, index) => (
                <TripViewCard key={index} {...tripInfo} />
            ))}
            <CreateTripCard />
        </Stack>
    );
}
