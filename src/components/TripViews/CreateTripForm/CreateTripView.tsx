import {
    Box,
    Button,
    Card,
    CardHeader,
    Container,
    Heading,
    Stack,
    Icon,
    Link,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    useSteps,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCalendar, FaLocationDot } from "react-icons/fa6";
import CreateTripNameAndDates from "./CreateTripNameAndDates.tsx";
import CreateTripLocations, { LocationInputs } from "./CreateTripLocations.tsx";
import { useState } from "react";

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
    const [tripName, setTripName] = useState("");
    const [dates, setDates] = useState({ startDate: "", endDate: "" });
    const [locations, setLocations] = useState<LocationInputs[]>([]);

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    function infoStage0(tripName: string, startDate: string, endDate: string) {
        setTripName(tripName);
        setDates({ startDate, endDate });
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
                return <CreateTripLocations onSubmit={infoStage1} />;
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
                <Link float={"right"} href="/" mt={4}>
                    <Button colorScheme={"gray"}>
                        <Icon as={FaArrowLeft} mb={1} mr={2} /> Back to Trips
                    </Button>
                </Link>
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
                                <>
                                    {(index ? ", " : "") + location.description}
                                </>
                            ))}
                        </div>
                    ) : null}
                </Stack>
            </Container>
            {formPart()}
        </Card>
    );
}
