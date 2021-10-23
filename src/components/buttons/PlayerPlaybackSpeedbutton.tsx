// General imports
import React from "react";
// Chakra imports
import { Select } from "@chakra-ui/select";
import { Tooltip } from "@chakra-ui/tooltip";

interface Props {
    setSpeed: (val: number) => void;
}

export const PlayerPlaybackSpeedbutton: React.FC<Props> = ({ setSpeed }) => {
    return (
        <Tooltip label="change playback speed">
            <Select
                defaultValue={1.0}
                minWidth="max-content"
                onChange={(e) => {
                    setSpeed(parseFloat(e.currentTarget.value));
                }}
                w="max-content"
            >
                <option value={0.25}>0.25</option>
                <option value={0.5}>0.5</option>
                <option value={0.75}>0.75</option>
                <option value={1.0}>1.0</option>
                <option value={1.25}>1.25</option>
                <option value={1.5}>1.5</option>
                <option value={1.75}>1.75</option>
                <option value={2.0}>2.0</option>
            </Select>
        </Tooltip>
    );
};
