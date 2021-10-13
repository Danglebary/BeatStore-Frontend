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
import { ProgressMain } from "../components/Progress/ProgressMain";

const CreateBeat: React.FC = () => {
    useIsAuth();

    const router = useRouter();

    const [{}, createBeat] = useCreateBeatMutation();

    const [data, setData] = useState({
        title: "",
        genre: "",
        bpm: 0,
        key: MusicalKeys.C_MAJOR,
        tags: [],
        file: null
    } as CreateBeatFormDataType);

    const [currentStep, setCurrentStep] = useState(0);

    const [showProgress, setShowProgress] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);

    const handleSubmit = async (values: CreateBeatFormDataType) => {
        const { file, ...gqlValues } = values;

        if (!file) {
            console.log("no file selected");
            return;
        }

        const fileExtension = file.name.split(".").slice(-1)[0];

        // get secureURL from server
        const url = await axios
            .put("http://localhost:1337/s3url", { extension: fileExtension })
            .then((res: any) => {
                return res.data.url;
            });

        // url to file on s3 used for backend db entry of beat
        const fileS3Url = url.split("?")[0];

        // show progress bar now
        setShowProgress(true);
        // put file to aws using secureURL
        await axios
            .put(url, file, {
                headers: { "content-type": "multipart/form-data" },
                onUploadProgress: (e: ProgressEvent) => {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    setProgressPercent(percent);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        // // if put req to aws is successful, post gql uploadBeat mutation
        const { error, data } = await createBeat({
            options: { ...gqlValues, s3Key: fileS3Url }
        });
        if (!error) {
            if (data?.createBeat.errors) {
                console.log("errors: ", data.createBeat.errors);
            } else if (data?.createBeat.beat) {
                setShowProgress(false);
                router.push(`/beat/${data.createBeat.beat.id}`);
            }
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
            {!showProgress ? null : <ProgressMain percent={progressPercent} />}
            <FormProgressStepper currentStep={currentStep} steps={steps} />
            <Box>{steps[currentStep]}</Box>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(CreateBeat);
