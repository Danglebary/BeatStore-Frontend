// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL type imports
import {
    BeatSimpleFragment,
    useDeleteBeatMutation,
    useMeQuery
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
import { Box, Grid, Link, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
// React-icons imports
import { RiDeleteBin6Line } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/tooltip";
import { isServer } from "../../utils/isServer";

interface BeatModalProps {
    beat: BeatSimpleFragment;
    isOpen: boolean;
    onClose: () => void;
}

export const BeatModal: React.FC<BeatModalProps> = ({
    beat,
    isOpen,
    onClose
}) => {
    const [{ data: meData }] = useMeQuery({
        pause: isServer()
    });

    const [{}, deleteBeat] = useDeleteBeatMutation();

    const handleDeleteBeat = () => {
        deleteBeat({ id: beat.id });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="x-large">
                    {beat.title}
                    <Text fontSize="lg" fontWeight="medium">
                        Prod.{" "}
                        <NextLink href={`/users/${beat.creator.id}`}>
                            <Link onClick={onClose}>
                                {beat.creator.username}
                            </Link>
                        </NextLink>
                    </Text>
                </ModalHeader>
                <Tooltip label="close modal">
                    <ModalCloseButton />
                </Tooltip>
                <ModalBody>
                    <Grid width="50%" templateColumns="repeat(2, 1fr)" gap={2}>
                        <Box>Genre:</Box>
                        <Box>{beat.genre}</Box>
                        <Box>Bpm:</Box>
                        <Box>{beat.bpm}</Box>
                        <Box>Key:</Box>
                        <Box>{beat.key}</Box>
                    </Grid>
                </ModalBody>
                {meData?.me?.id !== beat.creator.id ? null : (
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
                )}
            </ModalContent>
        </Modal>
    );
};
