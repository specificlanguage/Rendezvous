import {
    FieldArray,
    FieldArrayRenderProps,
    Form,
    Formik,
    FormikValues,
} from "formik";
import {
    Button,
    Flex,
    FormControl,
    Input,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { inviteFriends } from "../../../lib/http/TripQueries.ts";

interface CreateTripInviteProps {
    onSubmit: () => void;
    tripID: string;
}

interface EmailInputProps {
    index: number;
    arrayHelpers: FieldArrayRenderProps;
}

const validationSchema = Yup.object().shape({
    emails: Yup.array().of(Yup.string().email().required()),
});

export default function CreateTripInvites(props: CreateTripInviteProps) {
    const { onSubmit, tripID } = props;

    async function submit(values: FormikValues) {
        if (values.emails.length > 0) {
            await inviteFriends(tripID, values.emails);
        }
        onSubmit();
    }

    function EmailInput(props: EmailInputProps) {
        const { index, arrayHelpers } = props;

        return (
            <FormControl>
                <Flex>
                    <Input
                        name={`emails.${index}`}
                        placeholder={`friend${index + 1}@email.com`}
                        type="email"
                    />
                    <Spacer mr={8} />
                    <Button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                    >
                        <FaMinus />
                    </Button>
                </Flex>
            </FormControl>
        );
    }

    return (
        <Formik
            initialValues={{
                emails: [],
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
        >
            {({ handleSubmit, values, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <FieldArray
                        name={"emails"}
                        render={(arrayHelpers) => (
                            <Stack spacing={4}>
                                {values.emails.map((_, index) => (
                                    <EmailInput
                                        key={index}
                                        index={index}
                                        arrayHelpers={arrayHelpers}
                                    />
                                ))}
                                <Flex>
                                    <Text mt={2} as="i" fontSize="16px">
                                        Add friend to trip
                                    </Text>
                                    <Spacer />
                                    <Button
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                    >
                                        <FaPlus />
                                    </Button>
                                </Flex>
                            </Stack>
                        )}
                    />
                    <Button
                        mt={6}
                        type="submit"
                        colorScheme="blue"
                        isLoading={isSubmitting}
                    >
                        Create Trip
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

// <FieldArray name="emails" render={({
//                 move, swap, push, insert, unshift, pop
//             }) => (
//
//             )}>
//             </FieldArray>
