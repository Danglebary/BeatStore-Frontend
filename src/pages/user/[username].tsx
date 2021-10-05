// General imports
import React from "react";
import { useRouter } from "next/router";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
// GraphQL imports
import { useBeatQuery, useUserByUsernameQuery } from "../../generated/graphql";
// Chakra imports
import { Box, Flex, Heading } from "@chakra-ui/layout";
// Custom imports
import { Layout } from "../../components/Wrappers/Layout";
import { BeatCardMain } from "../../components/Cards/BeatCardMain";

const UserProfile: React.FC = () => {
    const router = useRouter();
    const username =
        typeof router.query.username === "string" ? router.query.username : "";

    const [{ data, error, fetching }] = useUserByUsernameQuery({
        pause: username === "",
        variables: {
            username: username
        }
    });

    let body = null;

    if (fetching) {
        body = <Box>loading...</Box>;
    }

    if (error) {
        body = <Box>{error.message}</Box>;
    }

    if (!data?.userByUsername) {
        body = <Box>Could not find user</Box>;
    } else {
        const user = data.userByUsername;
        body = (
            <Box>
                <Heading>{user.username}</Heading>
                <Flex flexDirection="column" gridGap="0.5em">
                    {user.beats.map((beat) => (
                        <BeatCardMain beat={beat} />
                    ))}
                </Flex>
            </Box>
        );
    }

    return <Layout>{body}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(UserProfile);
