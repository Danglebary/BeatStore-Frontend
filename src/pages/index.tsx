// General imports
import React from "react";
import NextLink from "next/link";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useBeatsQuery } from "../generated/graphql";
// Chakra imports
import { Link } from "@chakra-ui/layout";
// Custom imports
import { Layout } from "../components/Layout";

const Index: React.FC<{}> = () => {
    const [{ data }] = useBeatsQuery();
    return (
        <Layout varient="regular">
            <NextLink href="/create-beat">
                <Link>create beat</Link>
            </NextLink>
            <br />
            {!data ? (
                <div>loading...</div>
            ) : (
                data.beats.map(({ title, id }) => (
                    <div key={title + id}>{title}</div>
                ))
            )}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
