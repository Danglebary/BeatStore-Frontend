// General imports
import React from "react";
// Chakra imports
import {
    Tooltip,
    IconButton,
    IconButtonProps,
    ButtonProps
} from "@chakra-ui/react";

type Props = ButtonProps & {
    icon: IconButtonProps["icon"];
    label: string;
    onClick?: () => void;
};

export const IconButtonMain: React.FC<Props> = ({
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
                variant="ghost"
                _hover={{ backgroundColor: "transparent" }}
                _active={{ backgroundColor: "transparent" }}
                onClick={onClick}
            />
        </Tooltip>
    );
};
