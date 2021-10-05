// General imports
import React, { useState } from "react";
import NextLink from "next/link";
// GraphQL type imports
import {
    BeatSimpleFragment,
    useLikeBeatMutation
} from "../../generated/graphql";
// Chakra imports
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
// React Icon imports
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
// Custom imports
import { BeatModal } from "../Modals/BeatModal";
import AlertMain from "../Alerts/AlertMain";
import { AlertOptions } from "../../types/alertTypes";

interface BeatCardMainProps {
    beat: BeatSimpleFragment;
}

export const BeatCardMain: React.FC<BeatCardMainProps> = ({ beat }) => {
    // more info modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    // like beat error state
    const [likeError, setLikeError] = useState("");
    // like beat mutation
    const [{}, likeBeat] = useLikeBeatMutation();

    const handleLikeBeat = async () => {
        const result = await likeBeat({ beatId: beat.id });
        if (result.data?.likeBeat.error) {
            if (result.data.likeBeat.error.field === "like") {
                setLikeError(result.data.likeBeat.error.message);
            } else {
                console.log(result.data.likeBeat.error);
            }
        }
    };

    return (
        <>
            {!likeError ? null : (
                <AlertMain
                    status={AlertOptions.ERROR}
                    title="like"
                    description={likeError}
                    onClose={() => setLikeError("")}
                />
            )}
            <BeatModal beat={beat} isOpen={isOpen} onClose={onClose} />
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="0.5em">
                <Flex>
                    <NextLink href="/beat/[id]" as={`/beat/${beat.id}`}>
                        <Link>
                            <Heading fontSize="x-large">{beat.title}</Heading>
                        </Link>
                    </NextLink>
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
                    <Tooltip
                        label={
                            beat.likeStatus
                                ? "unlike this beat"
                                : "like this beat"
                        }
                    >
                        <span style={{ marginLeft: "auto" }}>
                            <IconButton
                                fontSize="x-large"
                                aria-label={
                                    beat.likeStatus
                                        ? "unlike this beat"
                                        : "like this beat"
                                }
                                icon={
                                    beat.likeStatus ? (
                                        <HiHeart />
                                    ) : (
                                        <HiOutlineHeart />
                                    )
                                }
                                colorScheme={beat.likeStatus ? "red" : "gray"}
                                onClick={handleLikeBeat}
                            />
                        </span>
                    </Tooltip>
                </Flex>
            </Box>
        </>
    );
};