import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns-tz";
import { FlightInfo } from "../../lib/types.ts";
import { FaArrowRight } from "react-icons/fa6";
import { fetcher } from "../../lib/fetch.ts";
import { useEffect, useState } from "react";

interface FlightCardProps {
    data: FlightInfo;
}

export interface AirportInfo {
    [key: string]: string;
}

export default function SmallFlightCard(props: FlightCardProps) {
    const [arrivalState, setArrivalState] = useState<AirportInfo>();
    const [departureState, setDepartureState] = useState<AirportInfo>();

    const flightData = props.data;
    const carrierImage = `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${flightData.carrierCode}.svg`;

    const departureDisplay = format(new Date(flightData.departure), "H:mm", {
        timeZone: departureState ? departureState["timezone"] : "",
    });
    const arrivalDisplay = format(new Date(flightData.arrival), "H:mm", {
        timeZone: arrivalState ? arrivalState["timezone"] : "",
    });

    useEffect(() => {
        const getAirportInfo = async () => {
            setArrivalState(
                (await fetcher(`/flight/airport?code=${flightData.origin}`))
                    .body[0],
            );
            setDepartureState(
                (
                    await fetcher(
                        `/flight/airport?code=${flightData.destination}`,
                    )
                ).body[0],
            );
        };

        getAirportInfo().catch((e) => console.log(e));
    }, []);

    console.log(departureState, arrivalState);

    return (
        <Box
            w="100%"
            py={2}
            px={5}
            bgColor="#e5e7eb"
            rounded="2xl"
            border="2px"
            borderColor="black"
        >
            <HStack>
                <Image
                    boxSize="50px"
                    src={carrierImage}
                    fallbackSrc="https://www.gstatic.com/flights/airline_logos/70px/dark/multi.png"
                />
                <Stack w="100%">
                    <Text as="b" fontSize="2xl">
                        {flightData.carrierCode} {flightData.flightNum}
                    </Text>
                    <Text w="100%">
                        {flightData.origin} ({departureDisplay}
                        ) <FaArrowRight /> {flightData.destination} (
                        {arrivalDisplay})
                    </Text>
                </Stack>
            </HStack>
        </Box>
    );
}
