// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL imports
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
// Chakra imports
import { Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { isServer } from "../../utils/isServer";

export const NavBar: React.FC = () => {
    const [{ data, fetching: meFetching }] = useMeQuery({
        pause: isServer()
    });

    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

    let body = null;

    if (meFetching) {
        // data is loading
    } else if (!data?.me) {
        // user not logged in
        body = (
            <>
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
                <NextLink
                    href="/user/[username]"
                    as={`/user/${data.me.username}`}
                >
                    <Button variant="link">{data.me.username}</Button>
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
        <Flex zIndex={1} position="sticky" top={0} bg="purple.800" p={4}>
            <NextLink href="/">
                <Button variant="link" mr="auto">
                    <Heading>Beat Store</Heading>
                </Button>
            </NextLink>
            <Flex
                justifyContent="center"
                alignItems="center"
                gridGap="1em"
                ml="auto"
            >
                {body}
            </Flex>
        </Flex>
    );
};
