// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL type imports
import {
    useLikeBeatMutation,
    useMeQuery,
    UserBeatsFragment
} from "../../generated/graphql";
// Chakra imports
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
// Custom imports
import { BeatEditButton } from "../Buttons/BeatEditButton";
import { BeatLikeButton } from "../Buttons/BeatLikeButton";
import { BeatUpdateModal } from "../Modals/BeatUpdateModal";
import { isServer } from "../../utils/isServer";
import { useRouter } from "next/router";

interface BeatCardUserProps {
    beat: UserBeatsFragment;
}

export const BeatCardUser: React.FC<BeatCardUserProps> = ({ beat }) => {
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
                <Flex>
                    <NextLink href="/beat/[id]" as={`/beat/${beat.id}`}>
                        <Link>
                            <Heading fontSize="x-large">{beat.title}</Heading>
                        </Link>
                    </NextLink>
                    <Box ml="auto">
                        {meData?.me?.id !== beat.creatorId ? (
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
