import {
    Button,
    Center,
    HStack,
    Icon,
    Link as ChakraLink,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    UseDisclosureProps,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaCalendar, FaPlus } from "react-icons/fa6";

interface FlightModalProps extends UseDisclosureProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export function FlightModal(props: FlightModalProps) {
    const { isOpen, onClose } = props;
    const location = useLocation();

    const pageBase = location.pathname;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Flight</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center mb={8}>
                        <HStack>
                            <ChakraLink
                                as={RouterLink}
                                to={pageBase + "/import"}
                            >
                                <Button colorScheme="blue" size="lg">
                                    <HStack>
                                        <Icon as={FaPlus} />
                                        <span>Import</span>
                                    </HStack>
                                </Button>
                            </ChakraLink>
                            <ChakraLink as={RouterLink} to={pageBase + "/book"}>
                                <Button
                                    colorScheme="blue"
                                    size="lg"
                                    isDisabled={true}
                                >
                                    <HStack>
                                        <Icon as={FaCalendar} />
                                        <span>Book</span>
                                    </HStack>
                                </Button>
                            </ChakraLink>
                        </HStack>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
