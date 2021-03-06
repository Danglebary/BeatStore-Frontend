// General imports
import React from "react";
// React-icon imports
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
// Custom imports
import { IconButtonMain } from "./IconButtonMain";

interface Props {
    likeStatus: boolean;
    handleClick: () => void;
}

export const BeatLikeButton: React.FC<Props> = ({
    likeStatus,
    handleClick
}) => {
    return (
        <IconButtonMain
            label={!likeStatus ? "like this beat" : "unlike this beat"}
            icon={!likeStatus ? <HiOutlineHeart /> : <HiHeart />}
            onClick={handleClick}
            textColor={!likeStatus ? "" : "red"}
        />
    );
};
