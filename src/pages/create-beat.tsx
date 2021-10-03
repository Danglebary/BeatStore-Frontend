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
    { option: "C major", value: "C major" },
    { option: "C minor", value: "C minor" },
    { option: "C# major", value: "C# major" },
    { option: "C# minor", value: "C# minor" },
    { option: "D major", value: "D major" },
    { option: "D minor", value: "D minor" },
    { option: "D# major", value: "D# major" },
    { option: "D# minor", value: "D# minor" },
    { option: "E major", value: "E major" },
    { option: "E minor", value: "E minor" },
    { option: "F major", value: "F major" },
    { option: "F minor", value: "F minor" },
    { option: "F# major", value: "F# major" },
    { option: "F# minor", value: "F# minor" },
    { option: "G major", value: "G major" },
    { option: "G minor", value: "G minor" },
    { option: "G# major", value: "G# major" },
    { option: "G# minor", value: "G# minor" },
    { option: "A major", value: "A major" },
    { option: "A minor", value: "A minor" },
    { option: "A# major", value: "A# major" },
    { option: "A# minor", value: "A# minor" },
    { option: "B major", value: "B major" },
    { option: "B minor", value: "B minor" }
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
