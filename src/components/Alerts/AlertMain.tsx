// General imports
import React from "react";
// Chakra imports
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/react";
// Custom imports
import { AlertOptions } from "../../types/alertTypes";

interface AlertMainProps {
    status: AlertOptions;
    title: string;
    description: string;
    onClose: () => void;
}

const AlertMain: React.FC<AlertMainProps> = ({
    status,
    title,
    description,
    onClose
}) => {
    return (
        <Alert status={status}>
            <AlertIcon />
            <AlertTitle mr={2}>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
            <CloseButton
                onClick={onClose}
                position="absolute"
                right="8px"
                top="8px"
            />
        </Alert>
    );
};

export default AlertMain;
