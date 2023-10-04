import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
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
import CreateTripLocationAndDates from "./CreateTripLocationAndDates.tsx";

const steps = [
    {
        title: "Location & Dates",
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
    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    return (
        <Card p={5} bg={"neutral-200"} _dark={{ bg: "neutral-900" }}>
            <CardHeader>
                <Heading as="h2" size="xl" float={"left"}>
                    Create Trip
                </Heading>
                <Link float={"right"} href="/" mt={4}>
                    <Button colorScheme={"gray"}>
                        <Icon as={FaArrowLeft} mb={1} mr={2} /> Back to Your
                        Trips
                    </Button>
                </Link>
            </CardHeader>
            <Center>
                <Card minW={"xl"} maxW={"xl"}>
                    <CardBody>
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
                    </CardBody>
                    <CreateTripLocationAndDates />
                </Card>
            </Center>
        </Card>
    );
}
