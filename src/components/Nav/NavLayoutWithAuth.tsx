// General imports
import React from "react";
import NextLink from "next/link";
// GraphQL imports
import { useLogoutMutation } from "../../generated/graphql";
// Chakra imports
import { Flex, Link } from "@chakra-ui/layout";
import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode
} from "@chakra-ui/react";
// React-icons imports
import { IoLogOutOutline, IoCloudUploadOutline, IoMenu } from "react-icons/io5";
import { BsMoon, BsSun } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
// Custom imports
import { ColorModeToggle } from "../Misc/ColorModeToggle";

interface Props {
    username: string;
    varient: "mobile" | "desktop";
}

export const NavLayoutWithAuth: React.FC<Props> = ({ username, varient }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const [{}, logout] = useLogoutMutation();

    const handleLogout = () => {
        logout();
    };

    let body = null;

    if (varient === "desktop") {
        body = (
            <Flex direction="row" gridGap={4} align="center">
                <NextLink href="/create-beat">
                    <Button as={Link} tabIndex={0}>
                        upload beat
                    </Button>
                </NextLink>
                <NextLink href="/[username]" as={`/${username}`}>
                    <Button variant="link" color="white">
                        {username}
                    </Button>
                </NextLink>
                <Button variant="link" color="white" onClick={handleLogout}>
                    sign out
                </Button>
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
                    <NextLink href="/create-beat">
                        <MenuItem icon={<IoCloudUploadOutline size="1.5em" />}>
                            upload beat
                        </MenuItem>
                    </NextLink>
                    <NextLink href="/[username]" as={`/${username}`}>
                        <MenuItem icon={<CgProfile size="1.5em" />}>
                            profile
                        </MenuItem>
                    </NextLink>
                    <MenuItem
                        icon={<IoLogOutOutline size="1.5em" />}
                        onClick={handleLogout}
                    >
                        log out
                    </MenuItem>
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
