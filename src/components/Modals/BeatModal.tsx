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
                                {beat.creator.userName}
                            </Link>
                        </NextLink>
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
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
