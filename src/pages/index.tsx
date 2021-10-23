// General imports
import React, { useEffect, useState } from "react";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useBeatsQuery } from "../generated/graphql";
// Chakra imports
import { Heading } from "@chakra-ui/layout";
// Custom imports
import { Layout } from "../components/Wrappers/Layout";
import { Button } from "@chakra-ui/button";
import { BeatSection } from "../components/Sections/BeatSectionMain";
import { useAudioContext } from "../contexts/audioContext";

const Index: React.FC = () => {
    const [variables, setVariables] = useState({
        limit: 10,
        cursor: null as string | null
    });
    const [{ data, error, fetching }] = useBeatsQuery({
        variables
    });

    const handleLoadMore = () => {
        setVariables({
            limit: variables.limit,
            cursor: data!.beats.beats[data!.beats.beats.length - 1].createdAt
        });
    };

    const audioContext = useAudioContext();

    let body = null;

    if (fetching) {
        body = <div>loading...</div>;
    } else if (error) {
        body = <div>could not load beats 😭</div>;
    } else if (data) {
        body = (
            <>
                <BeatSection beats={data!.beats.beats} />
                {data.beats.hasMore ? (
                    <Button
                        mt={6}
                        onClick={handleLoadMore}
                        isLoading={fetching}
                    >
                        load more
                    </Button>
                ) : null}
            </>
        );
    }

    useEffect(() => {
        if (data && data.beats) {
            if (audioContext) {
                audioContext.addToPlaylist(data.beats.beats);
            }
        }
    }, [data]);

    useEffect(() => {
        if (audioContext) {
            console.log(audioContext.playlist);
        }
    }, [audioContext]);

    return (
        <Layout varient="regular">
            <Heading>New Beats</Heading>
            <br />
            {body}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
