import { useState } from "react";
import ImportFlightForm from "../components/Flights/ImportFlightForm.tsx";
import { Box, Heading } from "@chakra-ui/react";
import { fetcher } from "../lib/fetch.ts";
import { FlightInfo } from "../lib/types.ts";
import SmallFlightCard from "../components/Flights/FlightCards.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

export default function ImportFlightPage() {
    // const { tripID } = useParams();
    // const navigate = useNavigate();
    const [flights, setFlights] = useState<FlightInfo[]>([]);
    const [loading, setLoading] = useState(false);

    async function getFlights(
        carrierCode: string,
        flightNum: number,
        flightDate: string,
    ) {
        setFlights([]);
        setLoading(true);
        const result = await fetcher(
            `/flight/search?flightNumber=${flightNum}&scheduledDate=${flightDate}&carrierCode=${carrierCode}`,
        );

        setLoading(false);

        if (result.status === 200) {
            setFlights(result.body.segments);
        }
    }

    return (
        <>
            <Box p={6} bg={"lightgrey"} color={"black"} rounded={"2xl"}>
                <Heading mb={4}>Import Flight</Heading>
                <ImportFlightForm
                    onSubmit={(cc, fn, fd) => getFlights(cc, fn, fd)}
                />
            </Box>
            <Box my={5} py={5} position="relative">
                {loading ? <LoadingSpinner /> : null}
                {flights.map((f, i) => (
                    <SmallFlightCard data={f} key={i} />
                ))}
            </Box>
        </>
    );
}
