// General imports
import React, { SelectHTMLAttributes } from "react";
import { useField } from "formik";
// Chakra imports
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { SelectField as Select } from "@chakra-ui/react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    label: string;
    options: { option: string; value: string }[];
};

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    options,
    ...props
}) => {
    const [field] = useField(props);
    return (
        <FormControl>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Select {...field} {...props}>
                {options.map(({ option, value }) => (
                    <option key={option} value={value}>
                        {option}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectField;
