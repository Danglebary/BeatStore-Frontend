// General imports
import React, { useState } from "react";
// Chakra imports
import { Flex, Box, Heading } from "@chakra-ui/layout";
// Custom imports
import { PlayerPlayPauseButton } from "../Buttons/PlayerPlayPauseButton";
import { PlayerLoopButton } from "../Buttons/PlayerLoopButton";
import { PlayerPreviousButton } from "../Buttons/PlayerPreviousButton";
import { PlayerNextButton } from "../Buttons/PlayerNextButton";
import { PlayerPlaybackSpeedbutton } from "../Buttons/PlayerPlaybackSpeedbutton";
import { PlayerSlider } from "../Sliders/PlayerSlider";
// Type imports
import { LoopOptions } from "../../types/playerTypes";
// Hook imports
import { useAudio } from "../../hooks/useAudio";
import { useFloatToTime } from "../../hooks/useFloatToTime";

interface AudioMainProps {
    beats: { url: string; title: string }[];
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

    const url = beats[currentTrack].url;

    const { floatToTime } = useFloatToTime();

    return (
        <Flex
            position="fixed"
            flexDirection="row"
            alignSelf="center"
            justify="space-evenly"
            align="center"
            width="full"
            left={0}
            bottom={0}
            padding={4}
            gridGap={4}
            zIndex={4}
        >
            <Flex width="90%" gridGap={4}>
                <Heading minW="max-content" fontSize="lg">
                    now playing: {metaData.name}
                </Heading>
                {!audioRef.current ? null : (
                    <>
                        <Box width={10}>{floatToTime(audioTime)}</Box>
                        <PlayerSlider
                            isPlaying={isPlaying}
                            toggleAudio={togglePlaying}
                            totalDur={audioRef.current.duration}
                            currentTime={audioTime}
                            setTime={setCurrentTime}
                        />
                        <Box width={10}>{metaData.duration}</Box>
                    </>
                )}
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
