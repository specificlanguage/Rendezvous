import {
    Box,
    Button,
    createStandaloneToast,
    Divider,
    Flex,
    Heading,
    HStack,
    Link as ChakraLink,
    Spacer,
    useDisclosure,
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
import InviteModal from "../Invite/InviteModal.tsx";
import { APP_THEME } from "../../lib/styles.ts";

interface NavbarLinkProps {
    href: string;
    displayName: string;
}

interface InviteButtonProps {
    tripID: string;
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

function OpenInviteModal(props: InviteButtonProps) {
    const { toast } = createStandaloneToast({ theme: APP_THEME });
    const toastID = "invite-success";

    function openFeedbackToast() {
        if (!toast.isActive(toastID)) {
            toast({
                id: toastID,
                title: "User(s) invited!",
                description: "Let them know to check their email soon.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    function onSubmit() {
        openFeedbackToast();
        onClose();
    }

    return (
        <>
            <Button
                _hover={{
                    textDecoration: "no-underline",
                    bg: "purple.800",
                    color: "white",
                }}
                className="text-lg p-1.5 px-2 hover:bg-purple-800 rounded-md"
                onClick={onOpen}
            >
                {props.displayName}
            </Button>
            <InviteModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                tripID={props.tripID}
            />
        </>
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

    // TODO: responsive check to collapse menu into submenu

    return (
        <Box bg="primary" color="white">
            <HStack h={12} spacing={8} w={"4xl"} mx={"auto"}>
                <ChakraLink
                    as={RouterLink}
                    to={`/trip/${trip.id}`}
                    textDecoration={"no-underline"}
                    _hover={{ textDecoration: "no-underline" }}
                >
                    <Heading size={"base"} ml={1.5}>
                        {trip.tripName.length > 32
                            ? trip.tripName.slice(0, 32)
                            : trip.tripName}
                    </Heading>
                </ChakraLink>
                <TripDatesDisplay
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                    dateFormat={"MM/dd/yy"}
                    style={"text-base"}
                />
                <TripLocationsDisplay
                    locations={trip.locations}
                    style={"text-base"}
                />
            </HStack>
            <Flex maxW={"4xl"} mx={"auto"}>
                <HStack h={16} spacing={4} mb={0} alignItems={"center"}>
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
                    <OpenInviteModal displayName={"Invite"} tripID={trip.id} />
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
        </Box>
    );
}
