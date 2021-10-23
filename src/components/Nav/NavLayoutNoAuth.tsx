// General imports
import React from "react";
import NextLink from "next/link";
// Chakra imports
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
// React-icons imports
import { IoCreateOutline, IoMenu } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { BsSun, BsMoon } from "react-icons/bs";
// Custom imports
import { ColorModeToggle } from "../Misc/ColorModeToggle";

interface Props {
    varient: "mobile" | "desktop";
}

export const NavLayoutNoAuth: React.FC<Props> = ({ varient }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    let body = null;

    if (varient === "desktop") {
        body = (
            <Flex direction="row" gridGap={4} align="center">
                <NextLink href="/login">
                    <Button variant="link" color="white">
                        login
                    </Button>
                </NextLink>
                <NextLink href="/register">
                    <Button variant="link" color="white">
                        register
                    </Button>
                </NextLink>
                <ColorModeToggle />
            </Flex>
        );
    } else {
        body = (
            <Menu>
                <MenuButton
                    fontSize="x-large"
                    as={IconButton}
                    icon={<IoMenu />}
                />
                <MenuList>
                    <NextLink href="/login">
                        <MenuItem icon={<IoLogInOutline size="1.5em" />}>
                            login
                        </MenuItem>
                    </NextLink>
                    <NextLink href="/register">
                        <MenuItem icon={<IoCreateOutline size="1.5em" />}>
                            register
                        </MenuItem>
                    </NextLink>
                    <MenuItem
                        closeOnSelect={false}
                        aria-label="toggle between light and dark mode"
                        icon={
                            colorMode === "light" ? (
                                <BsSun size="1.5em" />
                            ) : (
                                <BsMoon size="1.5em" />
                            )
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            toggleColorMode();
                        }}
                    >
                        {colorMode === "light"
                            ? "change to dark theme"
                            : "change to light theme"}
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    }

    return body;
};
