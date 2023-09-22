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
    useColorMode,
    Center,
    Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// interface Props {
//     children: React.ReactNode
// }

// const NavLink = (props: Props) => {
//     const { children } = props
//
//     return (
//         <Box
//             as="a"
//             px={2}
//             py={1}
//             rounded={'md'}
//             _hover={{
//                 textDecoration: 'none',
//                 bg: useColorModeValue('gray.200', 'gray.700'),
//             }}
//             href={'#'}>
//             {children}
//         </Box>
//     )
// }

function UsernameButton() {
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
                <MenuItem>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    // const { isOpen, onOpen, onClose } = useDisclosure()
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
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>

                            <UsernameButton />
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
