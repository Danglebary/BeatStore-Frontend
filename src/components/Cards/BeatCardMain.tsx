// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL type imports
import {
    BeatMainFragment,
    useLikeBeatMutation,
    useMeQuery
} from "../../generated/graphql";
// Chakra imports
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
// Custom imports
import { BeatEditButton } from "../Buttons/BeatEditButton";
import { BeatLikeButton } from "../Buttons/BeatLikeButton";
import { BeatUpdateModal } from "../Modals/BeatUpdateModal";
import { isServer } from "../../utils/isServer";
import { useRouter } from "next/router";

interface BeatCardMainProps {
    beat: BeatMainFragment;
}

export const BeatCardMain: React.FC<BeatCardMainProps> = ({ beat }) => {
    const router = useRouter();
    // me query info
    const [{ data: meData }] = useMeQuery({
        pause: isServer()
    });
    // edit beat modal
    const {
        isOpen: editIsOpen,
        onOpen: editOnOpen,
        onClose: editOnClose
    } = useDisclosure();

    // like beat mutation
    const [{}, likeBeat] = useLikeBeatMutation();

    const handleLikeBeat = async () => {
        if (!meData?.me?.id) {
            router.push("/login");
        }
        const result = await likeBeat({ beatId: beat.id });
        if (result.data?.likeBeat.error) {
            console.log(result.data.likeBeat.error);
        }
    };

    return (
        <>
            <BeatUpdateModal
                beat={beat}
                isOpen={editIsOpen}
                onClose={editOnClose}
            />
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="0.5em">
                <Flex align="center">
                    <Flex align="baseline" gridGap={2}>
                        <NextLink
                            href="/[username]/[title]"
                            as={`/${beat.creator.username}/${beat.title.replace(
                                " ",
                                "-"
                            )}`}
                        >
                            <Link>
                                <Heading fontSize="x-large">
                                    {beat.title}
                                </Heading>
                            </Link>
                        </NextLink>
                        <Text>
                            Prod.{" "}
                            <NextLink
                                href="/[username]/"
                                as={`/${beat.creator.username}/`}
                            >
                                <Link>{beat.creator.username}</Link>
                            </NextLink>
                        </Text>
                    </Flex>
                    <Box ml="auto">
                        {meData?.me?.id !== beat.creator.id ? (
                            <BeatLikeButton
                                likeStatus={beat.likeStatus}
                                handleClick={handleLikeBeat}
                            />
                        ) : (
                            <BeatEditButton onOpen={editOnOpen} />
                        )}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};
