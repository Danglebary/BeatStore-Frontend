// General imports
import React, { useState } from "react";
import NextLink from "next/link";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useBeatsQuery } from "../generated/graphql";
// Chakra imports
import { Box, Flex, Heading, Link, Stack } from "@chakra-ui/layout";
// Custom imports
import { Layout } from "../components/Layout";
import { Button } from "@chakra-ui/button";

const Index: React.FC<{}> = () => {
    const [variables, setVariables] = useState({
        limit: 1,
        cursor: null as string | null
    });
    const [{ data, fetching }] = useBeatsQuery({
        variables
    });

    const handleLoadMore = () => {
        setVariables({
            limit: variables.limit,
            cursor: data!.beats.beats[data!.beats.beats.length - 1].createdAt
        });
    };

    let body = null;

    if (fetching && !data) {
        body = <div>loading...</div>;
    } else if (!fetching && !data) {
        body = <div>could not load beats 😭</div>;
    } else {
        body = (
            <Stack spacing={8}>
                {data!.beats.beats.map(
                    ({ title, id, bpm, key, genre, creatorId }) => (
                        <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            key={title + id}
                        >
                            <Heading fontSize="lg">{title}</Heading>
                            <p>{bpm}</p>
                            <p>{key}</p>
                            <p>{genre}</p>
                            <p>{creatorId}</p>
                        </Box>
                    )
                )}
                {data && data.beats.hasMore ? (
                    <Button onClick={handleLoadMore} isLoading={fetching}>
                        load more
                    </Button>
                ) : null}
            </Stack>
        );
    }

    return (
        <Layout varient="regular">
            <Flex align="flex-end">
                <Heading>beatStore</Heading>
                <NextLink href="/create-beat">
                    <Link ml="auto">create beat</Link>
                </NextLink>
            </Flex>
            <br />
            {body}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
