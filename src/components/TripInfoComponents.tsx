import { Icon, Text } from "@chakra-ui/react";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { format } from "date-fns";
import { transformDateToTimezone } from "../lib/dates.ts";

interface TripDatesDisplayProps {
    startDate: string;
    endDate: string;
    css?: string;
}

interface TripLocationsDisplayProps {
    locations: string[];
    css?: string;
}

export function TripDatesDisplay(props: TripDatesDisplayProps) {
    const dateFormat = "MMM d, y";
    const startDateDisplay = format(
        transformDateToTimezone(props.startDate),
        dateFormat,
    );
    const endDateDisplay = format(
        transformDateToTimezone(props.endDate),
        dateFormat,
    );

    return (
        <Text className={props.css}>
            <Icon as={FaCalendar} w={5} h={5} mr={2} />
            {startDateDisplay} - {endDateDisplay}
        </Text>
    );
}

export function TripLocationsDisplay(props: TripLocationsDisplayProps) {
    const locationDisplay = props.locations.map((l) => l.split(",")[0]);

    return (
        <Text className={props.css}>
            <Icon as={FaLocationDot} w={5} h={5} mr={2} />
            {locationDisplay.map((location, index) => (
                <span key={index}>{(index ? ", " : "") + location}</span>
            ))}
        </Text>
    );
}
