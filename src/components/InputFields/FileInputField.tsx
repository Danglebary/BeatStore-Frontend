// General imports
import React, { useRef } from "react";
// Chakra imports
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { CreateBeatFormDataType } from "../../types/createBeatFormInputTypes";

type FileInputFieldProps = {
    values: CreateBeatFormDataType;
    accept: string;
    setFieldValues: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void;
};

export const FileInputField: React.FC<FileInputFieldProps> = ({
    accept,
    values,
    setFieldValues
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void =
        (e) => {
            if (e.currentTarget.files) {
                setFieldValues("file", e.currentTarget.files[0]);
            }
        };

    return (
        <Flex justify="left" align="center">
            <Input
                variant="flushed"
                type="file"
                accept={accept}
                multiple={false}
                ref={fileInputRef}
                onChange={(e) => handleInputChange(e)}
                hidden
            />
            <Button onClick={handleInputClick}>Choose file</Button>
            {!values.file ? null : <Text ml={4}>{values.file.name}</Text>}
        </Flex>
    );
};
