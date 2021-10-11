// General imports
import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React from "react";
import {
    AiOutlineLeftCircle,
    AiOutlinePauseCircle,
    AiOutlinePlayCircle,
    AiOutlineRightCircle
} from "react-icons/ai";
import { BeatsResponseSimpleFragment } from "../../generated/graphql";
import { useAudio } from "../../hooks/useAudio";
import { IconButtonMain } from "../Buttons/IconButtonMain";

interface AudioMainProps {
    beats: BeatsResponseSimpleFragment["beats"];
}

export const AudioMain: React.FC<AudioMainProps> = ({ beats }) => {
    const {
        currentTrack,
        isPlaying,
        togglePlaying,
        skipPrevTrack,
        skipNextTrack,
        audioRef,
        metaData
    } = useAudio({ beats });

    return (
        <Flex
            flexDirection="column"
            alignSelf="center"
            position="fixed"
            bottom={6}
            gridGap={4}
        >
            <Box>Duration: {metaData.duration} </Box>
            <Flex justify="center" align="center" gridGap={4}>
                <audio
                    ref={audioRef}
                    src={`http://localhost:1337/beat/${beats[currentTrack].s3Key}`}
                    preload="metadata"
                    onEnded={togglePlaying}
                    hidden
                />
                <IconButtonMain
                    label="play previous track"
                    icon={<AiOutlineLeftCircle />}
                    onClick={skipPrevTrack}
                />
                <IconButtonMain
                    label={isPlaying ? "pause track" : "play track"}
                    icon={
                        isPlaying ? (
                            <AiOutlinePauseCircle />
                        ) : (
                            <AiOutlinePlayCircle />
                        )
                    }
                    onClick={togglePlaying}
                />
                <IconButtonMain
                    label="play next track"
                    icon={<AiOutlineRightCircle />}
                    onClick={skipNextTrack}
                />
            </Flex>
        </Flex>
    );
};
