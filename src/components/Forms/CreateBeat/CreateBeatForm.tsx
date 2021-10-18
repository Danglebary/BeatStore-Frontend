// General imports
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// GraphQL imports
import { useCreateBeatMutation } from "../../../generated/graphql";
// Chakra imports
import { Box, Heading } from "@chakra-ui/layout";
// Custom imports
import { StepOne } from "./CreateBeatStepOne";
import { StepThree } from "./CreateBeatStepThree";
import { StepTwo } from "./CreateBeatStepTwo";
import { ProgressMain } from "../../Progress/ProgressMain";
import { FormProgressStepper } from "../FormProgressStepper";
// Types imports
import { CreateBeatFormDataType } from "../../../types/createBeatFormInputTypes";
import { MusicalKeys } from "../../../types/musicalKeysTypes";

export const CreateBeatForm: React.FC = () => {
    const router = useRouter();

    const [{}, createBeat] = useCreateBeatMutation();

    const [data, setData] = useState({
        title: "",
        genre: "",
        bpm: NaN,
        key: MusicalKeys.C_MAJOR,
        tags: [],
        file: null
    } as CreateBeatFormDataType);

    const [currentStep, setCurrentStep] = useState(0);

    const [showProgress, setShowProgress] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);

    const handleSubmitForm = async (values: CreateBeatFormDataType) => {
        const { file, ...gqlValues } = values;

        if (!file) {
            console.log("no file selected");
            return;
        }

        const fileExtension = file.name.split(".").slice(-1)[0];

        // get secureURL from server
        const url = await axios
            .put("http://localhost:1337/s3url", { extension: fileExtension })
            .catch((err) => {
                console.log(err);
            })
            .then((res: any) => {
                return res.data.url;
            });

        if (!url) {
            console.log("could not get signed url from server");
            return;
        }

        // url to file on s3 used for backend db entry of beat
        const fileS3Url = url.split("?")[0];

        setShowProgress(true);

        // put file to aws using secureURL
        try {
            await axios.put(url, file, {
                headers: { "content-type": "multipart/form-data" },
                onUploadProgress: (e: ProgressEvent) => {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    setProgressPercent(percent);
                }
            });
        } catch (err) {
            console.log(err);
            return;
        }

        // // if put req to aws is successful, post gql uploadBeat mutation
        const { error, data } = await createBeat({
            options: { ...gqlValues, s3Key: fileS3Url }
        });
        if (!error) {
            setShowProgress(false);
            if (data?.createBeat.errors) {
                console.log("errors: ", data.createBeat.errors);
            } else if (data?.createBeat.beat) {
                router.push(`/beat/${data.createBeat.beat.id}`);
            }
        }
    };

    const handleNextStep = (newData: CreateBeatFormDataType, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));
        if (final) {
            handleSubmitForm(newData);
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
        <Box>
            <Heading size="lg" mb={6}>
                Create new beat
            </Heading>
            {!showProgress ? null : <ProgressMain percent={progressPercent} />}
            <FormProgressStepper currentStep={currentStep} steps={steps} />
            <Box>{steps[currentStep]}</Box>
        </Box>
    );
};
