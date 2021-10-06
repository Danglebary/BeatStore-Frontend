// General imports
import React, { useState } from "react";
import NextLink from "next/link";
// GraphQL type imports
import {
    BeatSimpleFragment,
    useLikeBeatMutation,
    useMeQuery
} from "../../generated/graphql";
// Chakra imports
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
// React Icon imports
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
// Custom imports
import BeatInfoModal from "../Modals/BeatInfoModal";
import AlertMain from "../Alerts/AlertMain";
import { AlertOptions } from "../../types/alertTypes";
import { isServer } from "../../utils/isServer";

interface BeatCardMainProps {
    beat: BeatSimpleFragment;
}

export const BeatCardMain: React.FC<BeatCardMainProps> = ({ beat }) => {
    // me query info
    const [{ data: meData }] = useMeQuery({
        pause: isServer()
    });
    // show like button state
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
            <BeatInfoModal beat={beat} isOpen={isOpen} onClose={onClose} />
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="0.5em">
                <Flex>
                    <NextLink href="/beat/[id]" as={`/beat/${beat.id}`}>
                        <Link>
                            <Heading fontSize="x-large">{beat.title}</Heading>
                        </Link>
                    </NextLink>
                    <Box ml="auto">
                        <Tooltip label="beat info">
                            <IconButton
                                fontSize="x-large"
                                mr={4}
                                aria-label="beat info"
                                icon={<AiOutlineInfoCircle />}
                                onClick={onOpen}
                            />
                        </Tooltip>
                        {meData?.me?.id !== beat.creator.id ? null : (
                            <Tooltip label="update beat info">
                                <IconButton
                                    fontSize="x-large"
                                    aria-label="update beat info"
                                    colorScheme="green"
                                    icon={<FaRegEdit />}
                                />
                            </Tooltip>
                        )}
                    </Box>
                </Flex>
                <Flex mt={2}>
                    <Text>
                        Prod.{" "}
                        <NextLink href={`/users/${beat.creator.id}`}>
                            <Link>{beat.creator.username}</Link>
                        </NextLink>
                    </Text>
                    {meData?.me?.id === beat.creator.id ? null : (
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
                                    colorScheme={
                                        beat.likeStatus ? "red" : "gray"
                                    }
                                    onClick={handleLikeBeat}
                                />
                            </span>
                        </Tooltip>
                    )}
                </Flex>
            </Box>
        </>
    );
};
