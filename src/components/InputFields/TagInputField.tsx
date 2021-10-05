// General imports
import React, { useEffect, useRef, useState } from "react";
// Chakra imports
import {
    Flex,
    HStack,
    Input,
    Tag,
    TagCloseButton,
    TagLabel
} from "@chakra-ui/react";

interface TagInputFieldProps {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void;
}

export const TagInputField: React.FC<TagInputFieldProps> = ({
    setFieldValue
}) => {
    // ref for input element (should fix types instead of 'any')
    const inputRef = useRef(null) as any;

    // local state for tags array
    const [tags, setTags] = useState<string[]>([]);

    // function called when 'enter' or 'spacebar' key is pressed while input element is focused or active
    const handleChange: (event: React.KeyboardEvent<HTMLInputElement>) => void =
        (event) => {
            if (event.code === "Enter" || event.code === "Space") {
                if (inputRef.current) {
                    setTags([...tags, inputRef.current.value.toLowerCase()]);
                    inputRef.current.value = "";
                }
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
        <Flex direction="column" gridGap="1em">
            <Input
                ref={inputRef}
                type="text"
                onKeyDown={(e) => handleChange(e)}
                width="100%"
            />
            <HStack w="100%">
                {tags.map((tag, index) => (
                    <Tag key={index + tag} borderRadius="full" variant="solid">
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton
                            onClick={() => handleRemoveTag(index)}
                        />
                    </Tag>
                ))}
            </HStack>
        </Flex>
    );
};
