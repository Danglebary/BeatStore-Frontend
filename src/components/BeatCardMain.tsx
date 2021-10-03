// General imports
import React from "react";
import NextLink from "next/link";
// Chakra imports
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { useDisclosure } from "@chakra-ui/hooks";
// React Icon imports
import { AiOutlineInfoCircle } from "react-icons/ai";
// Custom imports
import { BeatModal } from "./BeatModal";
import { Tooltip } from "@chakra-ui/tooltip";

interface BeatCardMainProps {
    beat: any;
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
                            <Icon
                                fontSize="x-large"
                                as={AiOutlineInfoCircle}
                                onClick={onOpen}
                            />
                        </span>
                    </Tooltip>
                </Flex>
                <Text>
                    Prod.{" "}
                    <NextLink href={`/users/${beat.creator.id}`}>
                        <Link>{beat.creator.userName}</Link>
                    </NextLink>
                </Text>
            </Box>
        </>
    );
};
