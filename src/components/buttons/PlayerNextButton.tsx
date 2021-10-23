import React from "react";
import { AiOutlineRightCircle } from "react-icons/ai";
import { IconButtonMain } from "./IconButtonMain";

interface Props {
    onClick: () => void;
}

export const PlayerNextButton: React.FC<Props> = ({ onClick }) => {
    return (
        <IconButtonMain
            label="play next track"
            icon={<AiOutlineRightCircle />}
            onClick={onClick}
        />
    );
};
