// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL type imports
import { BeatSimpleFragment } from "../../generated/graphql";
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
import { Tooltip } from "@chakra-ui/tooltip";

interface BeatInfoModalProps {
    beat: BeatSimpleFragment;
    isOpen: boolean;
    onClose: () => void;
}

const BeatInfoModal: React.FC<BeatInfoModalProps> = ({
    beat,
    isOpen,
    onClose
}) => {
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
            </ModalContent>
        </Modal>
    );
};

export default BeatInfoModal;
