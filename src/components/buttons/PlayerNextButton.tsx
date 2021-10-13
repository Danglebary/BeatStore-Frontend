import React from "react";
import { AiOutlineRightCircle } from "react-icons/ai";
import { IconButtonMain } from "./IconButtonMain";

interface PlayerNextButtonProps {
    onClick: () => void;
}

export const PlayerNextButton: React.FC<PlayerNextButtonProps> = ({
    onClick
}) => {
    return (
        <IconButtonMain
            label="play next track"
            icon={<AiOutlineRightCircle />}
            onClick={onClick}
        />
    );
};
