// General imports
import React, { useState } from "react";
import { Formik, Form } from "formik";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useForgotPasswordDevMutation } from "../generated/graphql";
// Chakra imports
import { Button, Box } from "@chakra-ui/react";
// Custom imports
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [{}, forgotPasswordDev] = useForgotPasswordDevMutation();

    return (
        <Wrapper varient="small">
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPasswordDev({ email: values.email });
                    setComplete(true);
                }}
            >
                {({ isSubmitting }) =>
                    complete ? (
                        <Box>
                            If an account with that email exists, we sent you an
                            email 📧
                        </Box>
                    ) : (
                        <Form>
                            <InputField
                                name="email"
                                label="email"
                                placeholder="email"
                            />
                            <Button type="submit" isLoading={isSubmitting}>
                                submit
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
