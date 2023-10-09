import {
    Box,
    Button,
    Card,
    CardHeader,
    Heading,
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
import { FaArrowLeft } from "react-icons/fa6";
import CreateTripNameAndDates from "./CreateTripNameAndDates.tsx";

const steps = [
    {
        title: "Name & Dates",
    },
    {
        title: "Location",
    },
    {
        title: "Invites",
    },
];

// function _renderStepContent(step) {
//     switch (step) {
//     }
// }

export default function CreateTripView() {
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    function formPart() {
        switch (activeStep) {
            case 0:
                return (
                    <CreateTripNameAndDates onSubmit={() => setActiveStep(1)} />
                );
            case 1:
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
            <Stepper size="lg" index={activeStep}>
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
            {formPart()}
        </Card>
    );
}
