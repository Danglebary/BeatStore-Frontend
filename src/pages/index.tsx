// General imports
import React from "react";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { usePostsQuery } from "../generated/graphql";
// Custom imports
import NavBar from "../components/NavBar";

const Index: React.FC<{}> = () => {
    const [{ data }] = usePostsQuery();
    return (
        <>
            <NavBar />
            {!data ? (
                <div>loading...</div>
            ) : (
                data.posts.map(({ title, id }) => (
                    <div key={title + id}>{title}</div>
                ))
            )}
        </>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
