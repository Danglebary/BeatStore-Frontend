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
import { Layout } from "../components/Layout";
import { InputField } from "../components/InputField";

const ForgotPassword: React.FC = () => {
    const [complete, setComplete] = useState(false);
    const [{}, forgotPasswordDev] = useForgotPasswordDevMutation();

    return (
        <Layout varient="small">
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
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
