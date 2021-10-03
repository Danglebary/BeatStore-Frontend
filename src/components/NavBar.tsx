// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL imports
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
// Chakra imports
import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

export const NavBar: React.FC = () => {
    const [{ data, fetching: meFetching }] = useMeQuery();

    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

    let body = null;

    if (meFetching) {
        // data is loading
    } else if (!data?.me) {
        // user not logged in
        body = (
            <>
                <NextLink href="/">
                    <Button variant="link">home</Button>
                </NextLink>
                <NextLink href="/login">
                    <Button variant="link">login</Button>
                </NextLink>
                <NextLink href="/register">
                    <Button variant="link">register</Button>
                </NextLink>
            </>
        );
    } else {
        // user logged in
        body = (
            <>
                <Box>{data.me.userName}</Box>
                <NextLink href="/">
                    <Button variant="link">home</Button>
                </NextLink>
                <NextLink href="/create-beat">
                    <Button variant="link">create beat</Button>
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
        <Flex bg="purple.800" p={4}>
            <Flex
                justifyContent="center"
                justifyItems="center"
                gridGap="1em"
                ml="auto"
            >
                {body}
            </Flex>
        </Flex>
    );
};
