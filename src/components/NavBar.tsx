// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL imports
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
// Chakra imports
import { Box, Flex } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
// Custom imports
import { isServer } from "../utils/isServer";

export const NavBar: React.FC = () => {
    const [{ data, fetching: meQueryFetching }] = useMeQuery({
        pause: isServer()
    });

    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

    let body = null;

    if (meQueryFetching) {
        // data is loading
    } else if (!data?.me) {
        // user not logged in
        body = (
            <>
                <NextLink href="/">
                    <Link>home</Link>
                </NextLink>
                <NextLink href="/login">
                    <Link>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>register</Link>
                </NextLink>
            </>
        );
    } else {
        // user logged in
        body = (
            <>
                <Box>{data.me.userName}</Box>
                <NextLink href="/">
                    <Link>home</Link>
                </NextLink>
                <Button
                    variant="link"
                    isLoading={logoutFetching}
                    onClick={() => {
                        logout();
                    }}
                >
                    logout
                </Button>
            </>
        );
    }

    return (
        <Flex bg="tomato" p={4}>
            <Flex
                justifyContent="center"
                justifyItems="center"
                gridGap="1em"
                ml="auto"
                color="white"
            >
                {body}
            </Flex>
        </Flex>
    );
};
