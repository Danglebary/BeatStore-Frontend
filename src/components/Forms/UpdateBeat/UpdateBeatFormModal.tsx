// General imports
import React from "react";
// GraphQL imports
import { BeatSimpleFragment } from "../../../generated/graphql";
// Chakra imports
import { FormControl } from "@chakra-ui/form-control";
// Custom imports
import { InputField } from "../../InputFields/InputField";
import { SelectField } from "../../InputFields/SelectField";
import { TagInputField } from "../../InputFields/TagInputField";
import { AllKeys } from "../../../types/musicalKeysTypes";
import { CreateBeatFormDataType } from "../../../types/createBeatFormInputTypes";
import { Flex } from "@chakra-ui/layout";

interface UpdateBeatFormModalProps {
    beat: BeatSimpleFragment;
    values: CreateBeatFormDataType;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void;
}

const UpdateBeatFormModal: React.FC<UpdateBeatFormModalProps> = ({
    beat,
    values,
    setFieldValue
}) => {
    return (
        <FormControl>
            <Flex flexDirection="column" gridGap={4} mb={12}>
                <InputField
                    variant="flushed"
                    pl={2}
                    pr={2}
                    name="title"
                    label="update title?"
                    labelColor="cyan.500"
                    placeholder={beat.title}
                />
                <InputField
                    variant="flushed"
                    pl={2}
                    pr={2}
                    name="genre"
                    label="genre?"
                    labelColor="cyan.500"
                    placeholder={beat.genre ? beat.genre : "'Pop'..."}
                />
                <InputField
                    variant="flushed"
                    pl={2}
                    pr={2}
                    type="number"
                    name="bpm"
                    label="bpm?"
                    labelColor="cyan.500"
                    placeholder={beat.bpm ? beat.bpm.toString() : "'0'"}
                />
                <SelectField
                    width="100%"
                    bg="transparent"
                    pl={2}
                    pr={2}
                    pt={2.5}
                    pb={2.5}
                    name="key"
                    label="key?"
                    labelColor="cyan.500"
                    borderBottomStyle="solid"
                    borderBottomWidth="1px"
                    options={AllKeys}
                />
                <TagInputField
                    label="tags?"
                    labelColor="cyan.500"
                    values={values}
                    setFieldValue={setFieldValue}
                />
            </Flex>
        </FormControl>
    );
};

export default UpdateBeatFormModal;
