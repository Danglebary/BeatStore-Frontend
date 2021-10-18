// General imports
import React from "react";
// Chakra Imports
import { Box, Flex } from "@chakra-ui/layout";

interface USerBeatSectionProps {}

export const UserBeatSection: React.FC<USerBeatSectionProps> = ({}) => {
    return (
        <Flex flexDirection="column" gridGap={4}>
            <Box>this is a beat card, hello</Box>
        </Flex>
    );
};
