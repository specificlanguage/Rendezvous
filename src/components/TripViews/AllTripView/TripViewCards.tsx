import {
    AbsoluteCenter,
    Card,
    Heading,
    Icon,
    Link as ChakraLink,
    Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaCalendar, FaLocationDot, FaPlus } from "react-icons/fa6";
import { format } from "date-fns";
import { transformDateToTimezone } from "../../../lib/dates.ts";

interface TripViewCardProps {
    id: string;
    tripName: string;
    tripImage?: string;
    adminID: string;
    created: string;
    startDate: string;
    endDate: string;
    locations: string[];
}

interface TripCardsProps {
    cardProps: TripViewCardProps[];
}

function TripViewCard(props: TripViewCardProps) {
    const { id, tripName, startDate, endDate, locations } = props;

    const dateFormat = "MMM d, y";
    const startDateDisplay = format(
        transformDateToTimezone(startDate),
        dateFormat,
    );
    const endDateDisplay = format(transformDateToTimezone(endDate), dateFormat);
    const locationDisplay = locations.map((l) => l.split(",")[0]);

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
                <div className="text-neutral-500 text-base ">
                    <Icon as={FaCalendar} w={5} h={5} mr={1} />
                    {startDateDisplay} - {endDateDisplay}
                </div>
                <div className="text-neutral-500 text-base ">
                    <Icon as={FaLocationDot} w={5} h={5} mr={1} />
                    {locationDisplay.map((location, index) => (
                        <span key={index}>
                            {(index ? ", " : "") + location}
                        </span>
                    ))}
                </div>
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
