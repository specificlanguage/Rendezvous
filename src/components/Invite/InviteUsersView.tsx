import {
    Field,
    FieldArray,
    FieldArrayRenderProps,
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
import { inviteFriends } from "../../lib/http/TripQueries.ts";

interface CreateTripInviteProps {
    onSubmit: () => void;
    tripID: string;
    creatingTrip?: boolean;
}

interface EmailInputProps {
    index: number;
    arrayHelpers: FieldArrayRenderProps;
}

interface InviteFormValues {
    emails: string[];
}

const validationSchema = Yup.object().shape({
    emails: Yup.array().of(Yup.string().email()),
});

export default function InviteUsersView(props: CreateTripInviteProps) {
    const { onSubmit, tripID, creatingTrip } = props;
    const initialValues: InviteFormValues = {
        emails: [],
    };

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
                        as={Field}
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                submit(values);
            }}
        >
            {({ handleSubmit, values, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
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
                        my={4}
                        type="submit"
                        colorScheme="blue"
                        isLoading={isSubmitting}
                    >
                        {creatingTrip ? "Create Trip" : "Invite"}
                    </Button>
                </form>
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
