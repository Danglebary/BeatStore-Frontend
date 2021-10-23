// General imports
import React from "react";
// Chakra imports
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from "@chakra-ui/react";

interface PlayerSliderProps {
    isPlaying: boolean;
    toggleAudio: () => void;
    totalDur: number;
    currentTime: number;
    setTime: (val: number) => void;
}

export const PlayerSlider: React.FC<PlayerSliderProps> = ({
    isPlaying,
    toggleAudio,
    totalDur,
    currentTime,
    setTime
}) => {
    const handleSliderchange = (val: number) => {
        const timeToSet: number = Math.round((val / 100) * totalDur);
        setTime(timeToSet);
        if (!isPlaying) {
            toggleAudio();
        }
    };

    const sliderTime = Math.round((currentTime / totalDur) * 100);

    return (
        <Slider
            aria-label="track seek bar"
            defaultValue={0}
            value={sliderTime}
            onChange={handleSliderchange}
            focusThumbOnChange={false}
        >
            <SliderTrack backgroundColor="whiteAlpha.500">
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );
};
