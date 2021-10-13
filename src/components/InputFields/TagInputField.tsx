// General imports
import React, { useEffect, useRef, useState } from "react";
// Chakra imports
import {
    Flex,
    FormLabel,
    Input,
    Tag,
    TagCloseButton,
    TagLabel
} from "@chakra-ui/react";
// Custom imports
import { CreateBeatFormDataType } from "../../types/createBeatFormInputTypes";

interface TagInputFieldProps {
    label: string;
    labelColor?: string;
    values: CreateBeatFormDataType;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void;
}

export const TagInputField: React.FC<TagInputFieldProps> = ({
    label,
    labelColor = "",
    values,
    setFieldValue
}) => {
    // ref for input element (should fix types instead of 'any')
    const inputRef = useRef(null) as any;

    // local state for tags array
    const [tags, setTags] = useState<string[]>(
        values.tags ? [...values.tags] : []
    );

    // function called when 'enter' or 'spacebar' key is pressed while input element is focused or active
    const handleChange: (event: React.KeyboardEvent<HTMLInputElement>) => void =
        (event) => {
            if (
                event.code === "Enter" ||
                event.code === "Space" ||
                event.code === "Comma"
            ) {
                event.preventDefault();
                const data = inputRef.current.value.trim().toLowerCase();

                // no duplicates
                const duplicate = tags.indexOf(data);
                if (duplicate !== -1) {
                    inputRef.current.value = "";
                    return;
                }
                // no empty strings
                if (data === "") {
                    inputRef.current.value = "";
                    return;
                }
                if (data === ",") {
                    inputRef.current.value = "";
                    return;
                }
                // no more than 10 tags
                if (tags.length >= 10) {
                    inputRef.current.value = "";
                    return;
                }

                setTags([...tags, data]);
                inputRef.current.value = "";
            }
        };
    // function called when 'close' button is pressed on tag elements
    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((item) => tags.indexOf(item) !== index));
    };

    // life-cycle hook used to update value of 'tags' field in form
    useEffect(() => {
        setFieldValue("tags", tags);
    }, [tags]);

    return (
        <Flex direction="column" gridGap={0.5}>
            <FormLabel htmlFor="tagInput" textColor={labelColor}>
                {label}{" "}
                <span style={{ color: "grey" }}>
                    (seperated by space, max of 10)
                </span>
            </FormLabel>
            <Input
                variant="flushed"
                name="tagInput"
                id="tagInput"
                ref={inputRef}
                pl={2}
                pr={2}
                type="text"
                onKeyDown={(e) => handleChange(e)}
            />
            <Flex
                w="100%"
                mt={4}
                flexDirection="row"
                flexWrap="wrap"
                gridGap={2}
            >
                {tags.map((tag, index) => (
                    <Tag key={index + tag} borderRadius="full" variant="solid">
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton
                            onClick={() => handleRemoveTag(index)}
                        />
                    </Tag>
                ))}
            </Flex>
        </Flex>
    );
};
