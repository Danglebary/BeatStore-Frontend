// General imports
import React, { useState } from "react";
// Chakra imports
import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

interface TagInputFieldProps {}

export const TagInputField: React.FC<TagInputFieldProps> = ({}) => {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <HStack>
            {tags.map((tag, index) => (
                <Tag key={index + tag} borderRadius="full" variant="solid">
                    <TagLabel>tag</TagLabel>
                    <TagCloseButton />
                </Tag>
            ))}
            <input
                type="text"
                onChange={(e) => setTags([...tags, e.target.value])}
            />
        </HStack>
    );
};
