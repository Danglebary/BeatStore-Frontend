// General imports
import React, { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
// GraphQL imports
import {
    useLikeBeatMutation,
    useMeQuery,
    useSingleBeatByTitleAndUsernameQuery
} from "../../generated/graphql";
// Chakra imports
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
// Custom imports
import { Layout } from "../../components/Wrappers/Layout";
import { BeatUpdateModal } from "../../components/Modals/BeatUpdateModal";
import { isServer } from "../../utils/isServer";
import { BeatLikeButton } from "../../components/Buttons/BeatLikeButton";
import { BeatEditButton } from "../../components/Buttons/BeatEditButton";
import { AudioMain } from "../../components/Audio/AudioMain";

const UserBeatPage: React.FC = () => {
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

    const username =
        typeof router.query.username === "string" ? router.query.username : "";
    const beatTitle =
        typeof router.query.title === "string"
            ? router.query.title.replace("-", " ")
            : "";

    const [variables, _] = useState({
        username,
        beatTitle
    });

    const [{ data, error }] = useSingleBeatByTitleAndUsernameQuery({
        pause: username === "" || beatTitle === "",
        variables
    });

    // like beat mutation
    const [{}, likeBeat] = useLikeBeatMutation();

    const handleLikeBeat = async () => {
        if (!meData?.me?.id) {
            router.push("/login");
        }
        const result = await likeBeat({
            beatId: data!.singleBeatByTitleAndUsername!.id
        });
        if (result.data?.likeBeat.error) {
            console.log(result.data.likeBeat.error);
        }
    };

    let body = null;

    if (error) {
        body = (
            <div>
                <div>Could not find beat</div>
                <div>{error.message}</div>
            </div>
        );
    } else if (data && data.singleBeatByTitleAndUsername) {
        const beat = data.singleBeatByTitleAndUsername;

        body = (
            <>
                <BeatUpdateModal
                    beat={beat}
                    isOpen={editIsOpen}
                    onClose={editOnClose}
                />
                <AudioMain beats={[{ url: beat.s3Key, title: beatTitle }]} />
                <Box>
                    <Flex>
                        <Flex flexDirection="column" gridGap={4}>
                            <Heading>{beat.title}</Heading>
                            <Text>
                                Prod.{" "}
                                <NextLink
                                    href="/[username]/"
                                    as={`/${username}/`}
                                >
                                    <Link>{username}</Link>
                                </NextLink>
                            </Text>
                        </Flex>
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
    }

    return <Layout varient="regular">{body}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(UserBeatPage);
