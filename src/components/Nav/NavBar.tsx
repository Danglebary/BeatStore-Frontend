// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL imports
import { useMeQuery } from "../../generated/graphql";
// Chakra imports
import { Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
// Custom imports
import { isServer } from "../../utils/isServer";
import { NavLayoutWithAuth } from "./NavLayoutWithAuth";
import { NavLayoutNoAuth } from "./NavLayoutNoAuth";
import { useDimensions } from "../../hooks/useDimensions";

export const NavBar: React.FC = () => {
    const sizeType = useDimensions();

    const [{ data, fetching }] = useMeQuery({
        pause: isServer()
    });

    let body = null;

    if (fetching) {
    } else if (data && data.me === null) {
        body = <NavLayoutNoAuth varient={sizeType} />;
    } else if (data && data.me) {
        body = (
            <NavLayoutWithAuth varient={sizeType} username={data.me.username} />
        );
    }

    return (
        <Flex
            zIndex={1}
            position="sticky"
            top={0}
            backgroundColor="purple.800"
            p={4}
        >
            <Flex maxWidth={1000} align="center" flex={1} m="auto">
                <NextLink href="/">
                    <Button color="white" variant="link" mr="auto">
                        <Heading>Beat Store</Heading>
                    </Button>
                </NextLink>
                {body}
            </Flex>
        </Flex>
    );
};
