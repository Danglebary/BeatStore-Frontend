// General imports
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUserByUsernameQuery } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Layout } from "../../components/Wrappers/Layout";
import { BeatCardUser } from "../../components/Cards/BeatCardUser";
import { Button } from "@chakra-ui/button";

export const UserProfile: React.FC = () => {
    const router = useRouter();

    const username =
        typeof router.query.username === "string" ? router.query.username : "";

    const [variables, setVariables] = useState({
        username,
        limit: 10,
        cursor: null as string | null
    });

    const [{ data, error }] = useUserByUsernameQuery({
        pause: username === "",
        variables
    });

    const handleLoadMore = () => {
        setVariables({
            username: username,
            limit: variables.limit,
            cursor: data!.userByUsername!.beats.beats[
                data!.userByUsername!.beats.beats.length - 1
            ].createdAt
        });
    };

    let body = null;

    if (error) {
        body = (
            <div>
                <div>Could not find user</div>
                <div>{error.message}</div>
            </div>
        );
    } else if (data && data.userByUsername) {
        const userData = data.userByUsername;

        body = (
            <Box>
                <Heading mb={10}>{userData.username}</Heading>
                <Stack spacing={8}>
                    {userData.beats.beats.map((beat) =>
                        !beat ? null : (
                            <BeatCardUser
                                username={username}
                                beat={beat}
                                key={beat.title + beat.id}
                            />
                        )
                    )}
                    {userData.beats.hasMore ? (
                        <Button mt={6} onClick={handleLoadMore}>
                            load more
                        </Button>
                    ) : null}
                </Stack>
            </Box>
        );
    }

    return <Layout varient="regular">{body}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(UserProfile);
