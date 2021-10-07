// General imports
import React from "react";
// Chakra imports
import {
    Tooltip,
    IconButton,
    IconButtonProps,
    ButtonProps
} from "@chakra-ui/react";

type IconButtonMainProps = ButtonProps & {
    icon: IconButtonProps["icon"];
    label: string;
    onClick?: () => void;
};

export const IconButtonMain: React.FC<IconButtonMainProps> = ({
    icon,
    label,
    onClick,
    ...props
}) => {
    return (
        <Tooltip label={label}>
            <IconButton
                {...props}
                fontSize={props.fontSize ? props.fontSize : "x-large"}
                aria-label={label}
                icon={icon}
                onClick={onClick}
            />
        </Tooltip>
    );
};
