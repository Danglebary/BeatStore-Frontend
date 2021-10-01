// General imports
import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
// Chakra imports
import { Button } from "@chakra-ui/react";
// Custom imports
import { Layout } from "../components/Layout";
import { InputField } from "../components/InputField";
import { SelectField } from "../components/SelectField";
import { useCreateBeatMutation } from "../generated/graphql";
import { TagInputField } from "../components/TagInputField";
import { useIsAuth } from "../utils/useIsAuth";

const allKeys = [
    { option: "C major", value: "c_major" },
    { option: "C minor", value: "c_minor" },
    { option: "C# major", value: "c_sharp_major" },
    { option: "C# minor", value: "c_sharp_minor" },
    { option: "D major", value: "d_major" },
    { option: "D minor", value: "d_minor" },
    { option: "D# major", value: "d_sharp_major" },
    { option: "D# minor", value: "d_sharp_minor" },
    { option: "E major", value: "e_major" },
    { option: "E minor", value: "e_minor" },
    { option: "F major", value: "f_major" },
    { option: "F minor", value: "f_minor" },
    { option: "F# major", value: "f_sharp_major" },
    { option: "F# minor", value: "f_sharp_minor" },
    { option: "G major", value: "g_major" },
    { option: "G minor", value: "g_minor" },
    { option: "G# major", value: "g_sharp_major" },
    { option: "G# minor", value: "g_sharp_minor" },
    { option: "A major", value: "a_major" },
    { option: "A minor", value: "a_minor" },
    { option: "A# major", value: "a_sharp_major" },
    { option: "A# minor", value: "a_sharp_minor" },
    { option: "B major", value: "b_major" },
    { option: "B minor", value: "b_minor" }
];

const CreateBeat: React.FC = () => {
    useIsAuth();

    const router = useRouter();

    const [{}, uploadBeat] = useCreateBeatMutation();

    return (
        <Layout varient="small">
            <Formik
                initialValues={{
                    title: "",
                    genre: null,
                    bpm: null,
                    key: null,
                    tags: null
                }}
                onSubmit={async (values) => {
                    console.log(values);
                    const { error } = await uploadBeat({ options: values });
                    if (!error) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting, submitForm, setFieldValue }) => (
                    <Form>
                        <InputField
                            name="title"
                            label="title"
                            placeholder="title"
                        />
                        <InputField
                            name="genre"
                            label="genre"
                            placeholder="'trap'"
                        />
                        <InputField
                            name="bpm"
                            label="bpm"
                            placeholder="140"
                            type="number"
                        />
                        <SelectField name="key" label="key" options={allKeys} />
                        <TagInputField setFieldValue={setFieldValue} />
                        <Button
                            type="button"
                            onClick={submitForm}
                            isLoading={isSubmitting}
                        >
                            upload beat
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(CreateBeat);
