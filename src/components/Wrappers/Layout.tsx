// General imports
import React from "react";
import { ColorModeToggle } from "../Misc/ColorModeToggle";
import { NavBar } from "../Nav/NavBar";
// Custom imports
import { Wrapper, WrapperVarient } from "./Wrapper";

interface LayoutProps {
    varient?: WrapperVarient;
}

export const Layout: React.FC<LayoutProps> = ({ children, varient }) => {
    return (
        <>
            <NavBar />
            <Wrapper varient={varient}>{children}</Wrapper>
            <ColorModeToggle />
        </>
    );
};
