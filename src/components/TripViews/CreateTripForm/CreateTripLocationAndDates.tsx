import { Field, Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    VStack,
} from "@chakra-ui/react";

export default function CreateTripLocationAndDates() {
    const createTripSchema = Yup.object().shape({
        tripName: Yup.string().required("Trip name is required"),
        startDate: Yup.date().required(),
        endDate: Yup.date()
            .required()
            .min(
                Yup.ref("startDate"),
                "End date cannot be earlier than start date",
            ),
        location: Yup.string(),
    });

    const fakeLocations = [
        "Paris",
        "New York",
        "Hawaii",
        "Boston",
        "London",
        "Tokyo",
        "Singapore",
        "Grand Canyon",
    ];

    const randomLocation =
        fakeLocations[Math.floor(Math.random() * fakeLocations.length)];

    return (
        <Formik
            initialValues={{
                tripName: "",
                startDate: "",
                endDate: "",
                location: "",
            }}
            validationSchema={createTripSchema}
            onSubmit={async (values) => {}}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} m={4}>
                        {/* TRIP NAME */}
                        <FormControl
                            isInvalid={!!errors.tripName && touched.tripName}
                        >
                            <FormLabel htmlFor="tripName">Trip Name</FormLabel>
                            <Field
                                as={Input}
                                id="tripName"
                                name="tripName"
                                type="text"
                                placeholder="My Awesome Trip"
                                variant="filled"
                            />
                            {errors.tripName ? (
                                <FormErrorMessage float={"right"}>
                                    {errors.tripName}
                                </FormErrorMessage>
                            ) : (
                                <div className="mb-6" />
                            )}
                        </FormControl>
                        <HStack w={"full"}>
                            {/* START DATE */}
                            <FormControl>
                                <FormLabel htmlFor="startDate">
                                    Departs
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                />
                                <FormHelperText>
                                    You can change this later.
                                </FormHelperText>
                            </FormControl>
                            {/* END DATE */}
                            <FormControl
                                isInvalid={!!errors.endDate && touched.endDate}
                            >
                                <FormLabel htmlFor="startDate">
                                    Returns
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                />
                                {errors.endDate ? (
                                    <FormErrorMessage>
                                        {errors.endDate}
                                    </FormErrorMessage>
                                ) : (
                                    <div className="mb-6" />
                                )}
                            </FormControl>
                        </HStack>
                        {/* LOCATION */}
                        <FormControl
                            isInvalid={!!errors.location && touched.location}
                        >
                            <FormLabel htmlFor="tripName">
                                Location (optional)
                            </FormLabel>
                            <Field
                                as={Input}
                                id="location"
                                name="location"
                                type="text"
                                placeholder={randomLocation}
                                variant="filled"
                            />
                            <FormErrorMessage float={"right"}>
                                {errors.location}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={isSubmitting}
                        >
                            Create Trip
                        </Button>
                    </VStack>
                </form>
            )}
        </Formik>
    );
}
