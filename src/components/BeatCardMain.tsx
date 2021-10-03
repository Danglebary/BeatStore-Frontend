// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL type imports
import { BeatSimpleFragment } from "../generated/graphql";
// Chakra imports
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
// React Icon imports
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi";
// Custom imports
import { BeatModal } from "./BeatModal";

interface BeatCardMainProps {
    beat: BeatSimpleFragment;
}

export const BeatCardMain: React.FC<BeatCardMainProps> = ({ beat }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <BeatModal beat={beat} isOpen={isOpen} onClose={onClose} />
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="0.5em">
                <Flex>
                    <Heading fontSize="x-large">{beat.title}</Heading>
                    <Tooltip label="beat info">
                        <span style={{ marginLeft: "auto" }}>
                            <IconButton
                                fontSize="x-large"
                                aria-label="beat info"
                                icon={<AiOutlineInfoCircle />}
                                onClick={onOpen}
                            />
                        </span>
                    </Tooltip>
                </Flex>
                <Flex mt={2}>
                    <Text>
                        Prod.{" "}
                        <NextLink href={`/users/${beat.creator.id}`}>
                            <Link>{beat.creator.userName}</Link>
                        </NextLink>
                    </Text>
                    <Tooltip label="like this beat?">
                        <span style={{ marginLeft: "auto" }}>
                            <IconButton
                                fontSize="x-large"
                                aria-label="like this beat"
                                icon={<HiOutlineHeart />}
                            />
                        </span>
                    </Tooltip>
                </Flex>
            </Box>
        </>
    );
};
