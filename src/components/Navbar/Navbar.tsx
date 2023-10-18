// Courtesy of https://chakra-templates.dev/navigation/navbar

import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    // useDisclosure,
    useColorModeValue,
    Stack,
    Center,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { FIREBASE_AUTH } from "../../lib/firebase.ts";
import { signOut } from "firebase/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.ts";

function UsernameButton() {
    const navigate = useNavigate();

    async function signOutUser() {
        await signOut(FIREBASE_AUTH);
        localStorage.removeItem("name");
        navigate("/login");
    }

    const name = localStorage.getItem("name") ?? "";

    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
            >
                {/* TODO LATER: Allow custom images to be used for avatars. */}
                <Avatar size={"md"} name={name} />
            </MenuButton>
            <MenuList alignItems={"center"}>
                <br />
                <Center>
                    <Avatar size={"2xl"} name={name} />
                </Center>
                <br />
                <Center>
                    <p>{name}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={signOutUser}>Log Out</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default function Navbar() {
    const { user } = useAuthContext();

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box className="font-bold text-2xl">
                        <ChakraLink
                            as={RouterLink}
                            to="/"
                            textDecoration={"no-underline"}
                            _hover={{ textDecoration: "no-underline" }}
                        >
                            Rendezvous
                        </ChakraLink>
                    </Box>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={4}>
                            {user !== null ? (
                                <UsernameButton />
                            ) : (
                                <ChakraLink
                                    as={RouterLink}
                                    marginTop={1}
                                    to="/login"
                                >
                                    Log In/Sign Up
                                </ChakraLink>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
