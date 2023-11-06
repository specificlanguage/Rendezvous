import { useEffect } from "react";
import { Button, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import FlightView from "../components/TripViews/FlightView/FlightView.tsx";
import { FlightModal } from "../components/TripViews/FlightView/FlightModal.tsx";

export default function FlightPage() {
    // const { tripID } = useParams();
    // const navigate = useNavigate();
    // const [flights, setFlights] = useState<FlightInfo[]>();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        // const fetchData = async () => {
        //     const info = await fetcher(`/trip/flights?tripID=${tripID}`);
        //     if (info.status >= 400) {
        //         navigate("/");
        //     }
        //     console.log(info);
        // };
        //
        // fetchData().catch((e) => console.log(e));
    }, []);

    return (
        <>
            <div className="h-24">
                <Heading as="h2" size="xl" float={"left"}>
                    Flights
                </Heading>
                <div className="float-right">
                    <Button colorScheme={"gray"} onClick={onOpen}>
                        <Icon as={FaPlus} mb={1} mr={2} /> Add Flight
                    </Button>
                    <FlightModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                </div>
            </div>
            <FlightView flights={[]} />
        </>
    );
}
