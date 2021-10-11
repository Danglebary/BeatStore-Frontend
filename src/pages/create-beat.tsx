// General imports
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// Chakra imports
import { Box, Heading } from "@chakra-ui/layout";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useCreateBeatMutation } from "../generated/graphql";
// Custom imports
import { Layout } from "../components/Wrappers/Layout";
import StepOne from "../components/Forms/CreateBeat/StepOne";
import StepTwo from "../components/Forms/CreateBeat/StepTwo";
import { FormProgressStepper } from "../components/Forms/FormProgressStepper";
import StepThree from "../components/Forms/CreateBeat/StepThree";
import { CreateBeatFormDataType } from "../types/createBeatFormInputTypes";
import { MusicalKeys } from "../types/musicalKeysTypes";
import { useIsAuth } from "../utils/useIsAuth";

const CreateBeat: React.FC = () => {
    useIsAuth();

    const router = useRouter();

    const [{}, uploadBeat] = useCreateBeatMutation();

    const [data, setData] = useState({
        title: "",
        genre: "",
        bpm: 0,
        key: MusicalKeys.C_MAJOR,
        tags: [],
        file: null
    } as CreateBeatFormDataType);

    const [currentStep, setCurrentStep] = useState(0);

    const handleSubmit = async (values: CreateBeatFormDataType) => {
        const { file, ...gqlValues } = values;

        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            console.log("sending file");
            const res = await axios
                .post("http://localhost:1337/upload-beat", formData, {
                    headers: { "content-type": "mutipart/form-data" }
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
            if (res) {
                const key = res.data.toString();
                const { error, data } = await uploadBeat({
                    options: { ...gqlValues, s3Key: key }
                });
                if (!error) {
                    if (data?.createBeat.errors) {
                        console.log("errors: ", data.createBeat.errors);
                    } else if (data?.createBeat.beat) {
                        router.push(`/beat/${data.createBeat.beat.id}`);
                    }
                }
            }
        } else {
            console.log("you have to upload a file...");
        }
    };

    const handleNextStep = (newData: CreateBeatFormDataType, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));
        if (final) {
            handleSubmit(newData);
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevStep = (newData: CreateBeatFormDataType) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1);
    };

    const steps = [
        <StepOne next={handleNextStep} data={data} />,
        <StepTwo prev={handlePrevStep} next={handleNextStep} data={data} />,
        <StepThree prev={handlePrevStep} next={handleNextStep} data={data} />
    ];

    return (
        <Layout varient="small">
            <Heading size="lg" mb={6}>
                Create new beat
            </Heading>
            <FormProgressStepper currentStep={currentStep} steps={steps} />
            <Box>{steps[currentStep]}</Box>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(CreateBeat);
