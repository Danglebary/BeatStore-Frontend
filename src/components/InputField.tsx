import {
    FormControl,
    FormErrorMessage,
    FormLabel
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
};

const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, { error, touched }] = useField(props);
    return (
        <FormControl isInvalid={error && touched}>
            <FormLabel htmlFor={label}></FormLabel>
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

export default InputField;
