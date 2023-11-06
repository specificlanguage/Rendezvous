import { FlightInfo } from "../../../lib/types.ts";
import { FIREBASE_AUTH } from "../../../lib/firebase.ts";
import { Center, Divider, Heading, Text } from "@chakra-ui/react";

interface FlightViewProps {
    flights: FlightInfo[];
}

export default function FlightView(props: FlightViewProps) {
    const { flights } = props;
    // Separate flights from self and others
    const uid = FIREBASE_AUTH.currentUser?.uid ?? "";
    const selfFlights = flights.filter((f) =>
        f.passengers.some((u) => (u.id = uid)),
    );
    const otherFlights = flights.filter((f) => selfFlights.includes(f));

    function SelfFlights(props: FlightViewProps) {
        if (props.flights.length === 0) {
            return (
                <>
                    <Center>
                        <Heading as="h4" size="lg">
                            You don't have any flights yet!
                        </Heading>
                    </Center>
                    <Center className="mt-4">
                        <Text className="text-neutral-500">
                            Click "New Flight" on the top right corner to import
                            a flight!
                            <br />
                            (Booking still in development!)
                        </Text>
                    </Center>
                </>
            );
        }
    }

    function OtherFlights(props: FlightViewProps) {
        if (props.flights.length === 0) {
            return (
                <>
                    <Center>
                        <Heading as="h4" size="lg">
                            Hmmm...
                        </Heading>
                    </Center>
                    <Center className="mt-4">
                        <Text className="text-neutral-500">
                            It doesn't seem anybody's settled on a flight yet...
                            <br />
                            will you be the first one?
                        </Text>
                    </Center>
                </>
            );
        }
    }

    return (
        <>
            <SelfFlights flights={selfFlights} />
            <Divider my={8} colorScheme={"blue"} size={"lg"} />
            <Heading as="h3" size="lg">
                Other Flights
            </Heading>
            <OtherFlights flights={otherFlights} />
        </>
    );
}
