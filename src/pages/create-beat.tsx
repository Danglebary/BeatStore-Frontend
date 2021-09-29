// General imports
import React from "react";
import { Formik, Form } from "formik";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
// Chakra imports
import { Button } from "@chakra-ui/react";
// Custom imports
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { useCreateBeatMutation } from "../generated/graphql";

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

const CreateBeat: React.FC<{}> = ({}) => {
    const [{}, uploadBeat] = useCreateBeatMutation();

    return (
        <Wrapper varient="small">
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
                    const result = await uploadBeat({ options: values });
                    console.log(result);
                }}
            >
                {({ isSubmitting }) => (
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
                        <Button type="submit" isLoading={isSubmitting}>
                            upload beat
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(CreateBeat);
