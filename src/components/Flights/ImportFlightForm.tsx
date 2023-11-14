import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Spacer,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { FaArrowRight } from "react-icons/fa6";

interface ImportFlightFormProps {
    onSubmit: (
        carrierCode: string,
        flightNumber: number,
        flightDate: string,
    ) => void;
}

export default function ImportFlightForm(props: ImportFlightFormProps) {
    const { onSubmit } = props;
    const importFlightSchema = Yup.object().shape({
        carrierCode: Yup.string().required(),
        flightNumber: Yup.number().required().min(1).max(9999),
        flightDate: Yup.date().required("Departure date is required"),
        // .min(new Date(), "Date needs to be after today"),
    });

    return (
        <Formik
            initialValues={{
                carrierCode: "",
                flightNumber: "",
                flightDate: "",
            }}
            validationSchema={importFlightSchema}
            onSubmit={async (values) => {
                onSubmit(
                    values.carrierCode,
                    parseInt(values.flightNumber) ?? 0,
                    values.flightDate,
                );
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <Flex>
                        <FormControl w={1 / 4} mx={2}>
                            <FormLabel htmlFor="flightDate">Departs</FormLabel>
                            <Field
                                as={Input}
                                id="flightDate"
                                name="flightDate"
                                bg="white"
                                type="date"
                            />
                        </FormControl>
                        <FormControl w={1 / 12} mx={2}>
                            <FormLabel htmlFor="carrierCode">Code</FormLabel>
                            <Field
                                as={Input}
                                id="carrierCode"
                                name="carrierCode"
                                type="text"
                                bg="white"
                                placeholder="BA"
                            />
                        </FormControl>
                        <FormControl w={1 / 6} mx={2}>
                            <FormLabel htmlFor="flightNumber">
                                Flight #
                            </FormLabel>
                            <Field
                                as={Input}
                                id="flightNumber"
                                name="flightNumber"
                                type="number"
                                bg="white"
                                placeholder={212}
                            />
                        </FormControl>
                        <Spacer />
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            w={1 / 4}
                            mt={8}
                        >
                            Search <Icon as={FaArrowRight} ml={4} />
                        </Button>
                    </Flex>
                </form>
            )}
        </Formik>
    );
}
