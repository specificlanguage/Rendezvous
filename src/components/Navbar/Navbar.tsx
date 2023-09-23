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

interface NavProps {
    children: React.ReactNode;
}

function NavLink(props: NavProps) {
    const { children } = props;

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
            }}
        >
            {children}
        </Box>
    );
}

function UsernameButton() {
    async function signOutUser() {
        await signOut(FIREBASE_AUTH);
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
            >
                <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
            </MenuButton>
            <MenuList alignItems={"center"}>
                <br />
                <Center>
                    <Avatar
                        size={"2xl"}
                        src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                        }
                    />
                </Center>
                <br />
                <Center>
                    <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>
                    <button onClick={signOutUser}>Log Out</button>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
            setLoggedIn(true);
        }
    });

    return (
        <>
            <Box
                bg={useColorModeValue("gray.100", "gray.900")}
                px={4}
                m={8}
                rounded={"2xl"}
            >
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
                                <NavLink>
                                    <Link marginTop={"1"} href="/login">
                                        Log In/Sign Up
                                    </Link>
                                </NavLink>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
