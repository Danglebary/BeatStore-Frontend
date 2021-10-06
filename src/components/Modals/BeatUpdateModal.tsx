// General imports
import React from "react";
// GraphQL type imports
import {
    BeatSimpleFragment,
    useDeleteBeatMutation
} from "../../generated/graphql";
// Chakra imports
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import { IconButton } from "@chakra-ui/button";
// React-icons imports
import { RiDeleteBin6Line } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/tooltip";

interface BeatUpdateModalProps {
    beat: BeatSimpleFragment;
    isOpen: boolean;
    onClose: () => void;
}

const BeatUpdateModal: React.FC<BeatUpdateModalProps> = ({
    beat,
    isOpen,
    onClose
}) => {
    const [{}, deleteBeat] = useDeleteBeatMutation();

    const handleDeleteBeat = () => {
        deleteBeat({ id: beat.id });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="x-large">
                    edit track "{beat.title}""
                </ModalHeader>
                <Tooltip label="close modal">
                    <ModalCloseButton />
                </Tooltip>
                <ModalBody></ModalBody>
                <Tooltip label="delete beat">
                    <IconButton
                        position="absolute"
                        bottom={2}
                        right={2}
                        colorScheme="red"
                        aria-label="delete beat"
                        icon={<RiDeleteBin6Line />}
                        onClick={handleDeleteBeat}
                    />
                </Tooltip>
            </ModalContent>
        </Modal>
    );
};

export default BeatUpdateModal;
