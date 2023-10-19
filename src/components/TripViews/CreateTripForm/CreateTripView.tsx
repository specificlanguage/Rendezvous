import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Heading,
    Stack,
    Icon,
    Link as ChakraLink,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    Text,
    useSteps,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendar, FaLocationDot } from "react-icons/fa6";
import CreateTripNameAndDates from "./CreateTripNameAndDates.tsx";
import CreateTripLocations from "./CreateTripLocations.tsx";
import CreateTripInvites from "./CreateTripInvites.tsx";
import { useState } from "react";
import { LocationInputs } from "../../../lib/types.ts";

const steps = [
    {
        title: "Name & Dates",
    },
    {
        title: "Destinations",
    },
    {
        title: "Invites",
    },
];

export default function CreateTripView() {
    const [tripID, setTripID] = useState("");
    const [tripName, setTripName] = useState("");
    const [dates, setDates] = useState({ startDate: "", endDate: "" });
    const [locations, setLocations] = useState<LocationInputs[]>([]);
    const navigate = useNavigate();

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    function infoStage0(
        tripName: string,
        startDate: string,
        endDate: string,
        tripID: string,
    ) {
        setTripName(tripName);
        setDates({ startDate, endDate });
        setTripID(tripID);
        setActiveStep(1);
    }

    function infoStage1(locations: LocationInputs[]) {
        setLocations(locations);
        setActiveStep(2);
    }

    function formPart() {
        switch (activeStep) {
            case 0:
                return <CreateTripNameAndDates onSubmit={infoStage0} />;
            case 1:
                return (
                    <Card>
                        <CardHeader>
                            <Heading
                                as="h4"
                                fontSize="30px"
                                color="black"
                                my={1}
                                size="lg"
                            >
                                Add Destinations
                            </Heading>
                            <Text size={"md"}>
                                Search for destinations for the trip that
                                *you'd* like to go to, not locations that you
                                (or others) are departing from.
                                <br className="mb-2" />
                                Enter destinations in order of intended travel.
                                You can change it later if you need to.
                            </Text>
                        </CardHeader>
                        <CardBody>
                            <CreateTripLocations
                                onSubmit={infoStage1}
                                tripID={tripID}
                            />
                        </CardBody>
                    </Card>
                );
            case 2:
                return (
                    <Card>
                        <CardHeader>
                            <Heading as="h3" size="xl">
                                Invite friends
                            </Heading>
                            <Text>
                                A good trip isn't without friends! Invite them
                                to collaborate and to get info about their trip
                                with you. (You can always add more later)
                            </Text>
                        </CardHeader>
                        <CardBody>
                            <CreateTripInvites
                                onSubmit={() => navigate(`/trip/${tripID}`)}
                                tripID={tripID}
                            />
                        </CardBody>
                    </Card>
                );
            default:
                return (
                    <Card>
                        <CardHeader>
                            <Heading as="h2" size="xl" float={"left"}>
                                Oops, unimplemented!
                            </Heading>
                        </CardHeader>
                    </Card>
                );
        }
    }

    return (
        <Card p={5} bg={"neutral-200"} _dark={{ bg: "neutral-900" }}>
            <CardHeader>
                <Heading as="h2" size="xl" float={"left"}>
                    Create Trip
                </Heading>
                <ChakraLink as={RouterLink} float={"right"} to="/" mt={4}>
                    <Button colorScheme={"gray"}>
                        <Icon as={FaArrowLeft} mb={1} mr={2} /> Back to Trips
                    </Button>
                </ChakraLink>
            </CardHeader>
            <Stepper size="lg" index={activeStep} mb={4}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>
                        <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                        </Box>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            <Container>
                <Heading as="h3" size="lg" mb={1}>
                    {tripName}
                </Heading>
                <Stack mb={8} m={2} spacing={2}>
                    {dates.startDate != "" ? (
                        <div className="text-neutral-500 text-base">
                            <Icon as={FaCalendar} w={5} h={5} />{" "}
                            {dates.startDate} - {dates.endDate}{" "}
                        </div>
                    ) : null}
                    {locations.length > 0 ? (
                        <div className="text-neutral-500 text-base">
                            <Icon as={FaLocationDot} />{" "}
                            {locations.map((location, index) => (
                                <span key={index}>
                                    {(index ? ", " : "") + location.description}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </Stack>
            </Container>
            {formPart()}
        </Card>
    );
}
