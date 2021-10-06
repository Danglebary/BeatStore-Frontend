// General imports
import React, { useState } from "react";
import { useRouter } from "next/router";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useCreateBeatMutation } from "../generated/graphql";
// Custom imports
import { useIsAuth } from "../utils/useIsAuth";
import StepOne from "../components/Forms/CreateBeat/StepOne";
import StepTwo from "../components/Forms/CreateBeat/StepTwo";
import StepThree from "../components/Forms/CreateBeat/StepThree";
import { CreateBeatFormDataType } from "../types/createBeatFormInputTypes";
import { MusicalKeys } from "../types/musicalKeysTypes";
import { Layout } from "../components/Wrappers/Layout";

const CreateBeat: React.FC = () => {
    useIsAuth();

    const router = useRouter();

    const [{}, uploadBeat] = useCreateBeatMutation();

    const [data, setData] = useState({
        title: "",
        genre: "",
        bpm: 0,
        key: MusicalKeys.C_MAJOR,
        tags: []
    } as CreateBeatFormDataType);

    const [currentStep, setCurrentStep] = useState(0);

    const handleSubmit = async (values: CreateBeatFormDataType) => {
        console.log(values);
        const { error } = await uploadBeat({ options: values });
        if (!error) {
            router.push("/");
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

    return <Layout varient="small">{steps[currentStep]}</Layout>;
};

export default withUrqlClient(createUrqlClient)(CreateBeat);
