// General imports
import React, { useState } from "react";
// Chakra imports
import { Flex, Box, Heading } from "@chakra-ui/layout";
// Custom imports
import { PlayerPlayPauseButton } from "../Buttons/PlayerPlayPauseButton";
import { PlayerLoopButton } from "../Buttons/PlayerLoopButton";
import { PlayerPreviousButton } from "../Buttons/PlayerPreviousButton";
import { PlayerNextButton } from "../Buttons/PlayerNextButton";
// Type imports
import { BeatsResponseSimpleFragment } from "../../generated/graphql";
import { LoopOptions } from "../../types/playerTypes";
// Hook imports
import { useAudio } from "../../hooks/useAudio";
import { PlayerSlider } from "../Sliders/PlayerSlider";
import { floatToTime } from "../../utils/floatToTime";
import { PlayerPlaybackSpeedbutton } from "../Buttons/PlayerPlaybackSpeedbutton";

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
        replayTrack,
        setCurrentTime,
        setPlaybackSpeed,
        audioRef,
        metaData
    } = useAudio({ beats });

    const [loop, setLoop] = useState<LoopOptions>(LoopOptions.ALL);

    const [audioTime, setAudioTime] = useState(0);

    const onTrackEnded = () => {
        if (loop === LoopOptions.NONE) {
            togglePlaying();
        } else if (loop === LoopOptions.ALL) {
            skipNextTrack();
        } else {
            replayTrack();
        }
    };

    const url = beats[currentTrack].s3Key;

    return (
        <Flex
            position="fixed"
            flexDirection="column"
            alignSelf="center"
            width="800px"
            paddingLeft={4}
            paddingRight={4}
            bottom={6}
            gridGap={4}
        >
            <Heading fontSize="lg">now playing: {metaData.name}</Heading>
            {!audioRef.current ? null : (
                <Flex gridGap={4}>
                    <Box width={10}>{floatToTime(audioTime)}</Box>
                    <PlayerSlider
                        isPlaying={isPlaying}
                        toggleAudio={togglePlaying}
                        totalDur={audioRef.current.duration}
                        currentTime={audioTime}
                        setTime={setCurrentTime}
                    />
                    <Box width={10}>{metaData.duration}</Box>
                </Flex>
            )}
            <Flex justify="center" align="center" gridGap={4}>
                <PlayerPreviousButton onClick={skipPrevTrack} />
                <PlayerPlayPauseButton
                    isPlaying={isPlaying}
                    togglePlaying={togglePlaying}
                />
                <PlayerNextButton onClick={skipNextTrack} />
                <PlayerLoopButton state={loop} onClick={setLoop} />
                <PlayerPlaybackSpeedbutton setSpeed={setPlaybackSpeed} />
            </Flex>
            <audio
                ref={audioRef}
                preload="auto"
                crossOrigin=""
                src={url}
                onEnded={onTrackEnded}
                onTimeUpdate={(e) => {
                    setAudioTime(e.currentTarget.currentTime);
                }}
            />
        </Flex>
    );
};
