import { Field, Formik, FormikValues } from "formik";
import {
    AbsoluteCenter,
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebase.ts";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../../lib/fetch.ts";
import { useState } from "react";
import AltSignIns from "./AltSignInButton.tsx";

interface LoginFormProps {
    onSubmit?: () => void;
}

export default function LoginForm(formProps: LoginFormProps) {
    const navigate = useNavigate();
    const [signupError, setError] = useState(false);

    interface LoginProps extends FormikValues {
        email: string;
        password: string;
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
    });

    async function login(props: LoginProps) {
        const { email, password } = props;
        let isError = false;
        setError(false);

        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password).catch(
            (error) => {
                console.log(error);
                isError = true;
            },
        );

        if (isError) {
            setError(true);
            return;
        }

        await fetcher("/user/get", {}).then((resp) => {
            localStorage.setItem("name", resp.body.name);
            if (formProps.onSubmit) {
                formProps.onSubmit();
            } else {
                navigate("/");
            }
        });
    }

    return (
        <>
            {signupError && (
                <Alert status="error" fontSize={"sm"} mb={4} rounded={"2xl"}>
                    <AlertIcon /> Something went wrong. Check your email and
                    password.
                </Alert>
            )}

            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    verifyPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    await login(values);
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
                                <FormErrorMessage float={"right"}>
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
                                <FormErrorMessage float={"right"}>
                                    {errors.password}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="blue"
                                isLoading={isSubmitting}
                            >
                                Log in
                            </Button>
                        </VStack>
                    </form>
                )}
            </Formik>

            <Box position="relative">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                    or
                </AbsoluteCenter>
            </Box>

            <AltSignIns />
        </>
    );
}
