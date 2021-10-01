// General imports
import React from "react";
import { NavBar } from "./NavBar";
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
        </>
    );
};
