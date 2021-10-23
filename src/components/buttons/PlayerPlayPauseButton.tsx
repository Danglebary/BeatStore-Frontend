// General imports
import React from "react";
// React-icons imports
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
// Custom imports
import { IconButtonMain } from "./IconButtonMain";

interface Props {
    isPlaying: boolean;
    togglePlaying: () => void;
}

export const PlayerPlayPauseButton: React.FC<Props> = ({
    isPlaying,
    togglePlaying
}) => {
    return (
        <IconButtonMain
            label={isPlaying ? "pause track" : "play track"}
            icon={
                isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />
            }
            onClick={togglePlaying}
        />
    );
};
