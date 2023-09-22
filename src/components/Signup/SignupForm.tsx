import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import { Field, Formik, FormikValues } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { FirebaseApp } from "../../lib/firebase.ts";

export default function SignupForm() {
    const auth = getAuth(FirebaseApp);
    const passwordErrorMessage =
        "Password must be at least 6 characters, and contain a number and special character.";

    interface LoginProps extends FormikValues {
        email: string;
        password: string;
        verifyPassword: string;
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(6, passwordErrorMessage)
            .required("Required")
            .matches(
                /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
                passwordErrorMessage,
            ),
        verifyPassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "Passwords don't match",
        ),
        // .required('Required')
    });

    async function signup(props: LoginProps) {
        const { email, password } = props;
        console.log(`submitting ${email} as new user`);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => console.log(cred))
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <Box
            border={1}
            rounded={"2xl"}
            bg={"blue-500"}
            p={6}
            w={"2xl"}
            mx={"auto"}
        >
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    verifyPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    await signup(values);
                }}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                            <FormControl
                                isInvalid={!!errors.email && touched.email}
                            >
                                <FormLabel htmlFor="email">
                                    Email Address
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="email"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                />
                                <FormErrorMessage>
                                    {errors.email}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={
                                    !!errors.password && touched.password
                                }
                            >
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="password"
                                    name="password"
                                    type="password"
                                    variant="filled"
                                />
                                <FormErrorMessage>
                                    {errors.password}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={
                                    !!errors.verifyPassword &&
                                    touched.verifyPassword
                                }
                            >
                                <FormLabel htmlFor="password">
                                    Verify Password
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="password"
                                    name="password"
                                    type="password"
                                    variant="filled"
                                />
                                <FormErrorMessage>
                                    {errors.verifyPassword}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="purple"
                                isLoading={isSubmitting}
                            >
                                Sign Up
                            </Button>
                        </VStack>
                    </form>
                )}
            </Formik>
        </Box>
    );
}
