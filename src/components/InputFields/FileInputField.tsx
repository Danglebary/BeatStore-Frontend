// General imports
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
// Chakra imports
import { FormControl, FormLabel } from "@chakra-ui/form-control";

type FileInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void;
};

export const FileInputField: React.FC<FileInputFieldProps> = ({
    label,
    setFieldValue,
    ...props
}) => {
    const [field] = useField(props);

    const handleChange = (e: any) => {
        setFieldValue("file", e.target.files[0]);
    };

    return (
        <FormControl>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <input
                id={field.name}
                type="file"
                accept="audio/wav, audio/mp3"
                onChange={handleChange}
            />
        </FormControl>
    );
};
