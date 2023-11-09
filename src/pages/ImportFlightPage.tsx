import { useEffect } from "react";
import ImportFlightForm from "../components/Flights/ImportFlightForm.tsx";
import { Box, Heading } from "@chakra-ui/react";

export default function FlightPage() {
    // const { tripID } = useParams();
    // const navigate = useNavigate();
    // const [flights, setFlights] = useState<FlightInfo[]>();

    useEffect(() => {}, []);

    return (
        <Box p={6} bg={"lightgrey"} color={"black"} rounded={"2xl"}>
            <Heading mb={4}>Import Flight</Heading>
            <ImportFlightForm
                onSubmit={(cc, fn, fd) => console.log(cc, fn, fd)}
            />
        </Box>
    );
}
