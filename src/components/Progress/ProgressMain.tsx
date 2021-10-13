// General imports
import { Box, Flex } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import React from "react";
// Chakra imports

interface ProgressMainProps {
    percent: number;
}

export const ProgressMain: React.FC<ProgressMainProps> = ({ percent }) => {
    return (
        <Flex
            display="flex"
            flexDirection="column"
            gridGap={4}
            justify="center"
            mb={8}
        >
            <Box textColor="cyan.500">File upload progress:</Box>
            <Progress value={percent} borderRadius="md" colorScheme="pink" />
        </Flex>
    );
};
