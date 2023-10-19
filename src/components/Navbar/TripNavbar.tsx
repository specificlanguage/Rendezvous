import { Box, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useStore } from "zustand";
import { tripStore } from "../../lib/stores.ts";
import { TripInfo } from "../../lib/types.ts";

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
            <HStack
                h={16}
                spacing={8}
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
        </Box>
    );
}
