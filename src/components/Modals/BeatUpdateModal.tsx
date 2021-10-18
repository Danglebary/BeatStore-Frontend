// General imports
import React from "react";
import { useRouter } from "next/router";
// GraphQL type imports
import {
    BeatSimpleFragment,
    UpdateBeatInput,
    useDeleteBeatMutation,
    useUpdateBeatMutation
} from "../../generated/graphql";
// Chakra imports
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import { IconButton } from "@chakra-ui/button";
// React-icons imports
import { RiDeleteBin6Line } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/tooltip";
import { Form, Formik } from "formik";
// Custom imports
import UpdateBeatFormModal from "../Forms/UpdateBeat/UpdateBeatFormModal";
import { MusicalKeys } from "../../types/musicalKeysTypes";
import { Button, Flex } from "@chakra-ui/react";
import { toErrorMap } from "../../utils/toErrorMap";

interface BeatUpdateModalProps {
    beat: BeatSimpleFragment;
    isOpen: boolean;
    onClose: () => void;
}

export const BeatUpdateModal: React.FC<BeatUpdateModalProps> = ({
    beat,
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const [{}, updateBeat] = useUpdateBeatMutation();
    const [{}, deleteBeat] = useDeleteBeatMutation();

    const handleDeleteBeat = () => {
        deleteBeat({ id: beat.id });
    };

    const initialValues: UpdateBeatInput = {
        id: beat.id,
        title: beat.title,
        genre: beat.genre ? beat.genre : "",
        bpm: beat.bpm ? beat.bpm : 0,
        key: beat.key ? (beat.key as MusicalKeys) : MusicalKeys.C_MAJOR,
        tags: beat.tags
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="x-large">
                    edit beat: {beat.title}
                </ModalHeader>
                <Tooltip label="close modal">
                    <ModalCloseButton />
                </Tooltip>
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={async (values, { setErrors }) => {
                            const res = await updateBeat({ options: values });
                            if (res.data?.updateBeat.errors) {
                                setErrors(
                                    toErrorMap(res.data.updateBeat.errors)
                                );
                            } else if (res.data?.updateBeat.beat) {
                                router.push(`/beat/${values.id}`);
                            }
                        }}
                    >
                        {({ values, setFieldValue }: any) => (
                            <Form>
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <UpdateBeatFormModal
                                        beat={beat}
                                        values={values}
                                        setFieldValue={setFieldValue}
                                    />
                                    <Button type="submit">Update</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
                <Tooltip label="delete beat">
                    <IconButton
                        position="absolute"
                        bottom={2}
                        right={2}
                        colorScheme="red"
                        aria-label="delete beat"
                        icon={<RiDeleteBin6Line />}
                        onClick={handleDeleteBeat}
                    />
                </Tooltip>
            </ModalContent>
        </Modal>
    );
};
