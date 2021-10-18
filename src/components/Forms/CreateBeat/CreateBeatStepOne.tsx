// General imports
import React from "react";
// Formik imports
import { Formik, Form } from "formik";
// Chakra imports
import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
// Custom imports
import { InputField } from "../../InputFields/InputField";
import { CreateBeatFormDataType } from "../../../types/createBeatFormInputTypes";
import { FileInputField } from "../../InputFields/FileInputField";

interface StepOneProps {
    next: (newData: CreateBeatFormDataType, final?: boolean) => void;
    data: CreateBeatFormDataType;
}

export const StepOne: React.FC<StepOneProps> = ({ next, data }) => {
    const handleSubmit = (values: CreateBeatFormDataType) => {
        next(values);
    };

    return (
        <Formik initialValues={data} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
                <Form>
                    <Flex flexDirection="column" gridGap={6}>
                        <InputField
                            variant="flushed"
                            pl={2}
                            pr={2}
                            name="title"
                            label="What should we call this beat?"
                            labelColor="cyan.500"
                            placeholder="'Drip Too Hard'..."
                            autoCapitalize="on"
                            autoComplete="off"
                            required
                        />
                        <InputField
                            variant="flushed"
                            pl={2}
                            pr={2}
                            name="genre"
                            label="What genre best describes this beat?"
                            labelColor="cyan.500"
                            placeholder="e.g 'Pop'..."
                            autoCapitalize="words"
                            autoComplete="false"
                            required
                        />
                        <FileInputField
                            accept="audio/*"
                            values={values}
                            setFieldValues={setFieldValue}
                        />
                        <Button ml="auto" mt={4} type="submit">
                            Next
                        </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};
