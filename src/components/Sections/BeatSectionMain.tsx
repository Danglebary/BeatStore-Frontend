// General imports
import React from "react";
// Chakra imports
import { Stack } from "@chakra-ui/layout";
// GraphQL imports
import { BeatMainFragment } from "../../generated/graphql";
// Custom imports
import { BeatCardMain } from "../Cards/BeatCardMain";
import { AudioMain } from "../Audio/AudioMain";

interface BeatSectionProps {
    beats: BeatMainFragment[];
}

export const BeatSection: React.FC<BeatSectionProps> = ({ beats }) => {
    const beatAudioDatas: { url: string; title: string }[] = [];
    beats.forEach((beat) => {
        beatAudioDatas.push({ url: beat.s3Key, title: beat.title });
    });

    return (
        <>
            <AudioMain beats={beatAudioDatas} />
            <Stack spacing={8}>
                {beats.map((beat) =>
                    !beat ? null : (
                        <BeatCardMain beat={beat} key={beat.title + beat.id} />
                    )
                )}
            </Stack>
        </>
    );
};
