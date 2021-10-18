// General imports
import React, { SelectHTMLAttributes } from "react";
// Formik imports
import { useField } from "formik";
// Chakra imports
import { SelectField as Select, SelectFieldProps } from "@chakra-ui/react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel
} from "@chakra-ui/form-control";

type SelectInputFieldProps = SelectHTMLAttributes<HTMLSelectElement> &
    SelectFieldProps & {
        name: string;
        label: string;
        labelColor?: string;
        options: { option: string; value: string }[];
    };

export const SelectField: React.FC<SelectInputFieldProps> = ({
    label,
    labelColor = "",
    options,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl>
            <FormLabel htmlFor={field.name} textColor={labelColor}>
                {label}
            </FormLabel>
            <Select
                {...field}
                {...props}
                id={field.name}
                borderBottom="1px solid"
                borderBottomColor="whiteAlpha.300"
            >
                {options.map(({ option, value }) => (
                    <option key={value} value={value} id={value}>
                        {option}
                    </option>
                ))}
            </Select>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
