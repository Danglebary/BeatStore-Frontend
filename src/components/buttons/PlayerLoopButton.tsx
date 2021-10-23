// General imports
import React from "react";
import { MdRepeat, MdRepeatOn, MdRepeatOneOn } from "react-icons/md";
import { LoopOptions } from "../../types/playerTypes";
import { IconButtonMain } from "./IconButtonMain";

interface Props {
    state: LoopOptions;
    onClick: React.Dispatch<React.SetStateAction<LoopOptions>>;
}

export const PlayerLoopButton: React.FC<Props> = ({ state, onClick }) => {
    const handleLoopclick = () => {
        if (state === LoopOptions.NONE) {
            onClick(LoopOptions.ALL);
        } else if (state === LoopOptions.ALL) {
            onClick(LoopOptions.SINGLE);
        } else {
            onClick(LoopOptions.NONE);
        }
    };

    const loopIcon = () => {
        if (state === LoopOptions.NONE) {
            return <MdRepeat />;
        } else if (state === LoopOptions.ALL) {
            return <MdRepeatOn />;
        } else {
            return <MdRepeatOneOn />;
        }
    };

    const loopLabel = () => {
        if (state === LoopOptions.NONE) {
            return "Loop all tracks";
        } else if (state === LoopOptions.ALL) {
            return "Loop single track";
        } else {
            return "turn looping off";
        }
    };

    return (
        <IconButtonMain
            label={loopLabel()}
            icon={loopIcon()}
            onClick={handleLoopclick}
        />
    );
};
