// General imports
import React from "react";
// React-icon imports
import { AiOutlineInfoCircle } from "react-icons/ai";
// Custom imports
import { IconButtonMain } from "./IconButtonMain";

interface BeatInfoButtonProps {
    onOpen: () => void;
}

export const BeatInfoButton: React.FC<BeatInfoButtonProps> = ({ onOpen }) => {
    return (
        <IconButtonMain
            label="view beat info"
            icon={<AiOutlineInfoCircle />}
            onClick={onOpen}
            mr={4}
        />
    );
};
