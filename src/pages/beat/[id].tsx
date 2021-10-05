// General imports
import React from "react";
import { useRouter } from "next/router";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
// GraphQL imports
import { useBeatQuery } from "../../generated/graphql";
// Chakra imports
import { Box, Heading } from "@chakra-ui/layout";
// Custom imports
import { Layout } from "../../components/Wrappers/Layout";

const Beat: React.FC = () => {
    const router = useRouter();
    const intId =
        typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

    const [{ data, error, fetching }] = useBeatQuery({
        pause: intId === -1,
        variables: {
            id: intId
        }
    });

    let body = null;

    if (fetching) {
        body = <Box>loading...</Box>;
    }

    if (error) {
        body = <Box>{error.message}</Box>;
    }

    if (!data?.beat) {
        body = <Box>Could not find beat</Box>;
    } else {
        body = (
            <Box>
                <Heading>{data.beat.title}</Heading>
                <Box>{data.beat.creator.username}</Box>
                <Box>{data.beat.genre}</Box>
                <Box>{data.beat.bpm}</Box>
                <Box>{data.beat.key}</Box>
                <Box>{data.beat.tags}</Box>
                <Box>{data.beat.likesCount}</Box>
                <Box>{data.beat.createdAt}</Box>
                <Box>{data.beat.updatedAt}</Box>
            </Box>
        );
    }

    return <Layout>{body}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Beat);
