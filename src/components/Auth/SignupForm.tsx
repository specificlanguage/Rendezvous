import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import { Field, Formik, FormikValues } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { FIREBASE_AUTH } from "../../lib/firebase.ts";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const auth = FIREBASE_AUTH;
    const navigate = useNavigate();
    const passwordErrorMessage =
        "Password must be at least 6 characters, and contain a number and special character.";

    interface SignupProps extends FormikValues {
        name: string;
        email: string;
        password: string;
        verifyPassword: string;
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
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

    async function signup(props: SignupProps) {
        const { name, email, password } = props;
        console.log(`submitting ${email} as new user`);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => console.log(cred))
            .catch((error) => {
                console.log(error.message);
            });
        localStorage.setItem("name", name);
        navigate("/");
    }

    return (
        <Box
            border={1}
            rounded={"2xl"}
            bg={"blue-500"}
            p={6}
            maxW={"2xl"}
            mx={"auto"}
        >
            <Formik
                initialValues={{
                    name: "",
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
                            {/* NAME */}
                            <FormControl
                                isInvalid={!!errors.name && touched.name}
                            >
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Field
                                    as={Input}
                                    id="name"
                                    name="name"
                                    type="text"
                                    variant="filled"
                                />
                                {!errors.name ? (
                                    <FormHelperText>
                                        This is what other people will see.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>
                                        {errors.name}
                                    </FormErrorMessage>
                                )}
                            </FormControl>

                            {/* EMAIL */}
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
                                {!errors.email ? (
                                    <FormHelperText>
                                        You'll use this to log in.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>
                                        {errors.email}
                                    </FormErrorMessage>
                                )}
                            </FormControl>

                            {/* PASSWORD */}
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

                            {/* VERIFY PASSWORD (confirm) */}
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
