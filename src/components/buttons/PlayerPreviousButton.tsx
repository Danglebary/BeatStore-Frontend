import React from "react";
import { AiOutlineLeftCircle } from "react-icons/ai";
import { IconButtonMain } from "./IconButtonMain";

interface Props {
    onClick: () => void;
}

export const PlayerPreviousButton: React.FC<Props> = ({ onClick }) => {
    return (
        <IconButtonMain
            label="play previous track"
            icon={<AiOutlineLeftCircle />}
            onClick={onClick}
        />
    );
};
