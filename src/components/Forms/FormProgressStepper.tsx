// General imports
import React from "react";
// Chakra imports
import { Flex, Circle } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/react";

interface FormProgressStepperProps {
    currentStep: number;
    steps: JSX.Element[];
}

export const FormProgressStepper: React.FC<FormProgressStepperProps> = ({
    currentStep,
    steps
}) => {
    return (
        <Flex justify="center" align="center" mb={6}>
            {steps.map((_, index) => (
                <>
                    <Circle
                        size="1.5em"
                        layerStyle={currentStep > index ? "selected" : "base"}
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="cyan.500"
                        bg={currentStep >= index ? "cyan.500" : ""}
                    >
                        {index + 1}
                    </Circle>
                    {index !== steps.length - 1 ? (
                        <Progress
                            value={currentStep > index ? 100 : 0}
                            color={currentStep > index ? "cyan.500" : ""}
                            width="full"
                            height="5px"
                        />
                    ) : null}
                </>
            ))}
        </Flex>
    );
};
