// General imports
import React from "react";
// Chakra imports
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import Icon from "@chakra-ui/icon";
import { useColorMode } from "@chakra-ui/color-mode";
// React-icons imports
import { BsSun, BsMoon } from "react-icons/bs";

interface ColorModeToggleProps {}

export const ColorModeToggle: React.FC<ColorModeToggleProps> = ({}) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box position="fixed" bottom={6} right={6}>
            <Button onClick={toggleColorMode}>
                <Tooltip label="toggles between light and dark mode!">
                    <span>
                        <Icon as={colorMode === "light" ? BsSun : BsMoon} />
                    </span>
                </Tooltip>
            </Button>
        </Box>
    );
};
