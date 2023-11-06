import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    UseDisclosureProps,
} from "@chakra-ui/react";
import InviteUsersView from "./InviteUsersView.tsx";

interface InviteModalProps extends UseDisclosureProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSubmit: () => void;
    tripID: string;
}

export default function InviteModal(props: InviteModalProps) {
    const { isOpen, onClose, onSubmit, tripID } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {/* ML-0 required since it uses the header object. Will need to change in CSS to target the navbars specifically later. */}
                <ModalHeader ml={0}>Invite Users</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <Text>Send an invite to a friend's email!</Text>
                        <InviteUsersView onSubmit={onSubmit} tripID={tripID} />
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
