// General imports
import React, { useState } from "react";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useBeatsQuery } from "../generated/graphql";
// Chakra imports
import { Heading, Stack } from "@chakra-ui/layout";
// Custom imports
import { Layout } from "../components/Layout";
import { Button } from "@chakra-ui/button";
import { BeatCardMain } from "../components/BeatCardMain";

const Index: React.FC<{}> = () => {
    const [variables, setVariables] = useState({
        limit: 10,
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
                {data!.beats.beats.map((beat) => (
                    <BeatCardMain beat={beat} key={beat.title + beat.id} />
                ))}
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
            <Heading>New Beats</Heading>
            <br />
            {body}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
