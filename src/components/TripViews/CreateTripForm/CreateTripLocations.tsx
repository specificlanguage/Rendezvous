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
    Text,
    HStack,
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
        await querySetLocations(tripID, locations);
        onSubmit(locations);
    }

    return (
        <Container maxW="lg">
            <Stack>
                <Heading as="h4" fontSize="30px" color="black" my={1}>
                    Add Destinations
                </Heading>
                <Text my={0} color="black" fontSize="15px">
                    Search for destinations for the trip that *you'd* like to go
                    to, not locations that you (or others) are departing from.
                </Text>
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
                            <Tag size="lg" key={index}>
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
