import { Field, Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Icon,
    Input,
    VStack,
} from "@chakra-ui/react";
import { queryCreateTrip } from "../../../lib/http/TripQueries.ts";
import { FaArrowRight } from "react-icons/fa6";

interface CreateTripDateProps {
    onSubmit: (name: string, startDate: string, endDate: string) => void;
}

export default function CreateTripNameAndDates(props: CreateTripDateProps) {
    const { onSubmit } = props;
    const createTripSchema = Yup.object().shape({
        tripName: Yup.string().required("Trip name is required"),
        startDate: Yup.date().required("Depart date is required"),
        endDate: Yup.date()
            .required("End date is required")
            .min(
                Yup.ref("startDate"),
                "End date cannot be earlier than start date",
            ),
        // location: Yup.string(),
    });

    return (
        <Formik
            initialValues={{
                tripName: "",
                startDate: "",
                endDate: "",
                // location: "",
            }}
            validationSchema={createTripSchema}
            onSubmit={async (values) => {
                await queryCreateTrip(
                    values.tripName,
                    values.startDate,
                    values.endDate,
                );
                onSubmit(values.tripName, values.startDate, values.endDate);
            }}
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
                                variant="outline"
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
                                    mb={errors.endDate ? 0 : 6}
                                />
                                {errors.endDate ? (
                                    <FormErrorMessage>
                                        {errors.endDate}
                                    </FormErrorMessage>
                                ) : null}
                            </FormControl>
                        </HStack>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={isSubmitting}
                        >
                            Next step <Icon as={FaArrowRight} ml={4} />
                        </Button>
                    </VStack>
                </form>
            )}
        </Formik>
    );
}
