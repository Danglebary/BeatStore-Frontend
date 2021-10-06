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

interface StepOneProps {
    next: (newData: CreateBeatFormDataType, final?: boolean) => void;
    data: CreateBeatFormDataType;
}

const StepOne: React.FC<StepOneProps> = ({ next, data }) => {
    const handleSubmit = (values: CreateBeatFormDataType) => {
        next(values);
    };

    return (
        <Formik initialValues={data} onSubmit={handleSubmit}>
            {({}) => (
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
                        />
                        <InputField
                            variant="flushed"
                            pl={2}
                            pr={2}
                            name="genre"
                            label="What genre best describes this beat?"
                            labelColor="cyan.500"
                            placeholder="e.g 'Pop'..."
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

export default StepOne;
