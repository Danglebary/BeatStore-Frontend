// General imports
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
// Chakra imports
import {
    FormControl,
    FormErrorMessage,
    FormLabel
} from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
    InputProps & {
        name: string;
        label: string;
        labelColor?: string;
    };

export const InputField: React.FC<InputFieldProps> = ({
    label,
    labelColor = "",
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name} textColor={labelColor}>
                {label}
            </FormLabel>
            <Input
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
