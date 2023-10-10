import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useState } from "react";
import {
    Button,
    Card,
    Heading,
    Input,
    Stack,
    Icon,
    Container,
    Tag,
    TagLabel,
    TagCloseButton,
    HStack,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";

interface CreateTripLocationProps {
    onSubmit: () => void;
}

interface LocationInputs {
    description: string;
    place_id: string;
}

interface AutocompleteResults {
    results: LocationInputs[];
}

export default function CreateTripLocations(props: CreateTripLocationProps) {
    const { onSubmit } = props;

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
            setLocations((prev) => [...prev, input]);
            setLocationInput("");
            setSelected(true);
        }

        return (
            <Card p={4}>
                {props.results.map((res, index) => (
                    <button
                        key={index}
                        className="text-black"
                        onClick={() => select(res)}
                    >
                        {res.description}
                    </button>
                ))}
            </Card>
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
        // TODO: submit locations to backend
        onSubmit();
    }

    return (
        <Container maxW="lg">
            <Stack>
                <Heading as="h4" size="md" color="black" my={1}>
                    Add Locations
                </Heading>
                <Input
                    type="text"
                    mb={2}
                    value={locationInput}
                    onChange={(event) => {
                        setLocationInput(event.target.value);
                    }}
                />

                {!selectedLocation &&
                placePredictions.length > 0 &&
                !isPlacePredictionsLoading ? (
                    <AutocompleteResults results={placePredictions} />
                ) : null}

                {locations.length > 0 ? (
                    <HStack spacing={4}>
                        {locations.map((loc, index) => (
                            <Tag size="lg">
                                <TagLabel>{loc.description}</TagLabel>
                                <TagCloseButton
                                    onClick={() =>
                                        setLocations((loc) =>
                                            loc.filter((_, i) => i != index),
                                        )
                                    }
                                />
                            </Tag>
                        ))}
                    </HStack>
                ) : null}
                <Button
                    w="full"
                    colorScheme="blue"
                    disabled={locations.length > 4}
                    onClick={() => search()}
                >
                    Search
                </Button>

                <Button
                    type="submit"
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
