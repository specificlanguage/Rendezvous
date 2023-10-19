import {
    Box,
    Center,
    Divider,
    Flex,
    HStack,
    Link as ChakraLink,
    Spacer,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useStore } from "zustand";
import { tripStore } from "../../lib/stores.ts";
import { TripInfo } from "../../lib/types.ts";
import {
    TripDatesDisplay,
    TripLocationsDisplay,
} from "../TripInfoComponents.tsx";
import { FIREBASE_AUTH, isAdminOnTrip } from "../../lib/firebase.ts";

interface NavbarLinkProps {
    href: string;
    displayName: string;
}

function TripNavbarLink(props: NavbarLinkProps) {
    return (
        <Box className="text-lg p-1.5 px-2 hover:bg-purple-800 rounded-md">
            <ChakraLink
                as={RouterLink}
                to={props.href}
                textDecoration={"no-underline"}
                _hover={{ textDecoration: "no-underline" }}
            >
                {props.displayName}
            </ChakraLink>
        </Box>
    );
}

export default function TripNavbar() {
    const trip = useStore(
        tripStore,
        (s: { trip: TripInfo | undefined }) => s.trip,
    );

    if (!trip) {
        return null;
    }

    return (
        <Box bg="primary" color="white">
            <Center>
                <Flex maxW={"3xl"}>
                    <HStack
                        h={16}
                        spacing={4}
                        mb={0}
                        alignItems={"center"}
                        w={"3xl"}
                        mx={"auto"}
                    >
                        <Box className="font-bold text-2xl">
                            <ChakraLink
                                as={RouterLink}
                                to={`/trip/${trip.id}`}
                                textDecoration={"no-underline"}
                                _hover={{ textDecoration: "no-underline" }}
                            >
                                {trip.tripName}
                            </ChakraLink>
                        </Box>
                        <TripNavbarLink
                            href={`/trip/${trip.id}`}
                            displayName={"Dashboard"}
                        />
                        <Divider orientation="vertical" h="32px" />
                        <TripNavbarLink
                            href={`/trip/${trip.id}/flights`}
                            displayName={"Flights"}
                        />
                        <TripNavbarLink
                            href={`/trip/${trip.id}/hotels`}
                            displayName={"Hotels"}
                        />
                        <TripNavbarLink
                            href={`/trip/${trip.id}/plans`}
                            displayName={"Plans"}
                        />
                    </HStack>
                    <Spacer />
                    <HStack>
                        <TripNavbarLink
                            href={`/trip/${trip.id}/invite`}
                            displayName={"Invite"}
                        />
                        {isAdminOnTrip(
                            trip,
                            FIREBASE_AUTH.currentUser?.uid ?? "",
                        ) ? (
                            <TripNavbarLink
                                href={`/trip/${trip.id}/manage`}
                                displayName={"Manage"}
                            />
                        ) : null}
                    </HStack>
                </Flex>
            </Center>
            {/* TODO: fix margins here on the navbar */}
            <HStack h={12} spacing={8} mt={-3} mb={4} w={"3xl"} mx={"auto"}>
                <TripDatesDisplay
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                />
                <TripLocationsDisplay locations={trip.locations} />
            </HStack>
        </Box>
    );
}
