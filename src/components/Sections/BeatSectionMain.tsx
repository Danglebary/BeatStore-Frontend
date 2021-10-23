// General imports
import React from "react";
// Chakra imports
import { VStack } from "@chakra-ui/layout";
// GraphQL imports
import { BeatMainFragment } from "../../generated/graphql";
// Custom imports
import { BeatCardMain } from "../Cards/BeatCardMain";
import { AudioMain } from "../Audio/AudioMain";

interface Props {
    beats: BeatMainFragment[];
}

export const BeatSection: React.FC<Props> = ({ beats }) => {
    const beatAudioDatas: { url: string; title: string }[] = [];
    beats.forEach((beat) => {
        beatAudioDatas.push({ url: beat.s3Key, title: beat.title });
    });

    return (
        <>
            <AudioMain beats={beatAudioDatas} />
            <VStack align="stretch" spacing={8} pb={200}>
                {beats.map((beat) =>
                    !beat ? null : (
                        <BeatCardMain beat={beat} key={beat.title + beat.id} />
                    )
                )}
            </VStack>
        </>
    );
};
