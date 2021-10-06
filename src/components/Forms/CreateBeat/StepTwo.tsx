// General imports
import React from "react";
// Formik imports
import { Formik, Form } from "formik";
// Chakra imports
import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
// Custom imports
import { InputField } from "../../InputFields/InputField";
import { SelectField } from "../../InputFields/SelectField";
import { AllKeys } from "../../../types/musicalKeysTypes";
import { CreateBeatFormDataType } from "../../../types/createBeatFormInputTypes";
import { TagInputField } from "../../InputFields/TagInputField";

interface StepTwoProps {
    prev: (newData: CreateBeatFormDataType) => void;
    next: (newData: CreateBeatFormDataType, final?: boolean) => void;
    data: CreateBeatFormDataType;
}

const StepTwo: React.FC<StepTwoProps> = ({ prev, next, data }) => {
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
                            name="bpm"
                            type="number"
                            label="What is the bpm?"
                            labelColor="cyan.500"
                            placeholder="'140...'"
                        />
                        <SelectField
                            width="100%"
                            bg="transparent"
                            pl={2}
                            pr={2}
                            pt={2.5}
                            pb={2.5}
                            name="key"
                            label="What is the key?"
                            labelColor="cyan.500"
                            options={AllKeys}
                        />
                        <TagInputField
                            label="Any tags?"
                            labelColor="cyan.500"
                            values={values}
                            setFieldValue={setFieldValue}
                        />
                        <Flex
                            mt={4}
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Button onClick={() => prev(values)}>Back</Button>
                            <Button type="submit">Next</Button>
                        </Flex>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default StepTwo;
