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
    Link,
} from "@chakra-ui/react";
import { FIREBASE_AUTH } from "../../lib/firebase.ts";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UsernameButton() {
    const navigate = useNavigate();

    async function signOutUser() {
        await signOut(FIREBASE_AUTH);
        // TODO Later: Create redux state variable so we don't store this in localStorage.
        localStorage.setItem("name", "");
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
    const [isLoggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box className="font-bold text-2xl">
                        <Link
                            href="/"
                            textDecoration={"no-underline"}
                            _hover={{ textDecoration: "no-underline" }}
                        >
                            Rendezvous
                        </Link>
                    </Box>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={4}>
                            {isLoggedIn ? (
                                <UsernameButton />
                            ) : (
                                <Link marginTop={"1"} href="/login">
                                    Log In/Sign Up
                                </Link>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
