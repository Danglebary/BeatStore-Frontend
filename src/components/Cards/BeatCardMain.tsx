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
import { BeatInfoButton } from "../buttons/BeatInfoButton";
import { BeatEditButton } from "../buttons/BeatEditButton";
import { BeatLikeButton } from "../buttons/BeatLikeButton";
import BeatInfoModal from "../Modals/BeatInfoModal";
import BeatUpdateModal from "../Modals/BeatUpdateModal";
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
    // more info modal
    const {
        isOpen: infoIsOpen,
        onOpen: infoOnOpen,
        onClose: infoOnClose
    } = useDisclosure();
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
            <BeatInfoModal
                beat={beat}
                isOpen={infoIsOpen}
                onClose={infoOnClose}
            />
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="0.5em">
                <Flex>
                    <NextLink href="/beat/[id]" as={`/beat/${beat.id}`}>
                        <Link>
                            <Heading fontSize="x-large">{beat.title}</Heading>
                        </Link>
                    </NextLink>
                    <Box ml="auto">
                        <BeatInfoButton onOpen={infoOnOpen} />
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
                <Flex mt={2}>
                    <Text>
                        Prod.{" "}
                        <NextLink href={`/users/${beat.creator.id}`}>
                            <Link>{beat.creator.username}</Link>
                        </NextLink>
                    </Text>
                </Flex>
            </Box>
        </>
    );
};
