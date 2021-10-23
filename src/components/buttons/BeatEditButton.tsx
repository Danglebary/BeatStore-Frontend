// General imports
import React from "react";
// React-icon imports
import { BiEdit } from "react-icons/bi";
// Custom imports
import { IconButtonMain } from "./IconButtonMain";

interface Props {
    onOpen: () => void;
}

export const BeatEditButton: React.FC<Props> = ({ onOpen }) => {
    return (
        <IconButtonMain
            label="edit beat info"
            icon={<BiEdit />}
            onClick={onOpen}
        />
    );
};
