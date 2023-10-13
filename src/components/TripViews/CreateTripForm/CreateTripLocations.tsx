import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Input,
    Stack,
    Icon,
    Container,
    Tag,
    TagLabel,
    TagCloseButton,
    Wrap,
    WrapItem,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";
import { LocationInputs } from "../../../lib/types";
import { querySetLocations } from "../../../lib/http/TripQueries.ts";

interface CreateTripLocationProps {
    onSubmit: (locations: LocationInputs[]) => void;
    tripID: string;
}

interface AutocompleteResults {
    results: LocationInputs[];
}

interface LocationDisplayProps {
    loc: LocationInputs;
    index: number;
}

export default function CreateTripLocations(props: CreateTripLocationProps) {
    const { onSubmit, tripID } = props;

    const [locationInput, setLocationInput] = useState("");
    const [locations, setLocations] = useState<LocationInputs[]>([]);
    const [isSubmitting, setSubmitting] = useState(false);
    const [selectedLocation, setSelected] = useState(false);

    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        usePlacesService({
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            debounce: 300,
            sessionToken: true,
        });

    function AutocompleteResults(props: AutocompleteResults) {
        function select(input: LocationInputs) {
            setLocations((prev) => [
                ...prev,
                { description: input.description, place_id: input.place_id },
            ]);
            setLocationInput("");
            setSelected(true);
        }

        return (
            <Card p={0}>
                <CardBody p={2}>
                    <Stack spacing={0}>
                        {props.results.map((res, index) => (
                            <button
                                key={index}
                                className="text-black text-left hover:text-blue-900"
                                onClick={() => select(res)}
                            >
                                {res.description}
                            </button>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
        );
    }

    function LocationDisplay(props: LocationDisplayProps) {
        const { index, loc } = props;

        return (
            <Tag size="lg" key={index}>
                <TagLabel>{loc.description}</TagLabel>
                <TagCloseButton
                    onClick={() =>
                        setLocations((loc) => loc.filter((_, i) => i != index))
                    }
                />
            </Tag>
        );
    }

    function search() {
        if (locationInput != "") {
            getPlacePredictions({
                input: locationInput,
                types: ["(cities)"],
            });
            setSelected(false);
        }
    }

    async function submit() {
        setSubmitting(true);
        await querySetLocations(tripID, locations);
        onSubmit(locations);
    }

    return (
        <Container maxW="lg">
            <Stack>
                <Flex mb={2}>
                    <Input
                        type="text"
                        w={96}
                        value={locationInput}
                        placeholder="Search for locations..."
                        onChange={(event) => {
                            setLocationInput(event.target.value);
                        }}
                    />
                    <Spacer />
                    <Button
                        type="button"
                        colorScheme="blue"
                        disabled={locations.length > 4}
                        ml={2}
                        onClick={() => search()}
                    >
                        Search
                    </Button>
                </Flex>

                {!selectedLocation &&
                placePredictions.length > 0 &&
                !isPlacePredictionsLoading ? (
                    <AutocompleteResults results={placePredictions} />
                ) : null}
                {locations.length > 0 ? (
                    <Wrap align="center" spacing="5px">
                        {locations.map((loc, index) => (
                            <>
                                {index > 0 ? (
                                    <WrapItem>
                                        <Icon as={FaArrowRight} />
                                    </WrapItem>
                                ) : null}
                                <WrapItem>
                                    <LocationDisplay loc={loc} index={index} />
                                </WrapItem>
                            </>
                        ))}
                    </Wrap>
                ) : null}
                <Button
                    type="button"
                    colorScheme="blue"
                    variant="outline"
                    isLoading={isSubmitting}
                    onClick={async () => await submit()}
                    disabled={locations.length === 0}
                    _disabled={{ bg: "rgb(153, 204, 255)" }}
                >
                    Next step <Icon as={FaArrowRight} ml={4} />
                </Button>
            </Stack>
        </Container>
    );
}
