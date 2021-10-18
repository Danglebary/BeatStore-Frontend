// General imports
import React from "react";
// Chakra imports
import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
// Custom imports
import { CreateBeatFormDataType } from "../../../types/createBeatFormInputTypes";

interface StepThreeProps {
    prev: (newData: CreateBeatFormDataType) => void;
    next: (newData: CreateBeatFormDataType, final?: boolean) => void;
    data: CreateBeatFormDataType;
}

export const StepThree: React.FC<StepThreeProps> = ({ prev, next, data }) => {
    // format key string without underscore, capital first letter, and # symbol
    const keyParts = data.key.split("_");
    let keyToShow = "";
    if (keyParts.length > 2) {
        keyToShow = [
            [keyParts[0].toUpperCase(), "#"].join(""),
            keyParts[2]
        ].join(" ");
    } else {
        keyToShow = [keyParts[0].toUpperCase(), keyParts[1]].join(" ");
    }

    return (
        <Box>
            <Grid templateColumns="repeat(2, 1fr)" gridGap={6}>
                <Box textColor="cyan.500">Title:</Box>
                <Box>{data.title}</Box>
                <Box textColor="cyan.500">Genre:</Box>
                <Box>{data.genre}</Box>
                <Box textColor="cyan.500">Bpm:</Box>
                <Box>{data.bpm}</Box>
                <Box textColor="cyan.500">Key:</Box>
                <Box>{keyToShow}</Box>
                <Box textColor="cyan.500">Tags:</Box>
                <Flex
                    minWidth="250px"
                    flexDirection="row"
                    flexWrap="wrap"
                    gridGap={2}
                >
                    {data.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </Flex>
                <Box textColor="cyan.500">File:</Box>
                <Box>{data.file?.name}</Box>
            </Grid>
            <Flex mt={4} flexDirection="row" justifyContent="space-between">
                <Button onClick={() => prev(data)}>Back</Button>
                <Button onClick={() => next(data, true)}>Submit</Button>
            </Flex>
        </Box>
    );
};
