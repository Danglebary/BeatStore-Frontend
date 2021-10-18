// General imports
import React from "react";
// Chakra imports
import { IconButton } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { useColorMode } from "@chakra-ui/color-mode";
// React-icons imports
import { BsSun, BsMoon } from "react-icons/bs";

interface ColorModeToggleProps {}

export const ColorModeToggle: React.FC<ColorModeToggleProps> = ({}) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Tooltip label="toggle between light and dark mode!">
                <IconButton
                    size="md"
                    fontSize="x-large"
                    position="fixed"
                    top={4}
                    right={6}
                    aria-label="toggle between light and dark mode"
                    icon={colorMode === "light" ? <BsSun /> : <BsMoon />}
                    onClick={toggleColorMode}
                    zIndex={5}
                />
            </Tooltip>
        </>
    );
};
