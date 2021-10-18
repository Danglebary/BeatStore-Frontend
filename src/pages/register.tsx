// General imports
import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useRegisterMutation } from "../generated/graphql";
// Chakra imports
import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
// Custom imports
import { Layout } from "../components/Wrappers/Layout";
import { InputField } from "../components/InputFields/InputField";
import { toErrorMap } from "../utils/toErrorMap";

const Register: React.FC = () => {
    const router = useRouter();

    const [{}, register] = useRegisterMutation();

    return (
        <Layout varient="small">
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await register({ options: values });
                    if (res.data?.register.errors) {
                        setErrors(toErrorMap(res.data.register.errors));
                    } else if (res.data?.register.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Flex flexDirection="column" gridGap={6}>
                            <InputField
                                name="email"
                                variant="flushed"
                                label="email"
                                labelColor="cyan.500"
                                placeholder="email@email.com"
                                autoCapitalize="off"
                                required
                            />
                            <InputField
                                name="username"
                                variant="flushed"
                                label="username"
                                labelColor="cyan.500"
                                placeholder="username"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                required
                            />
                            <InputField
                                name="password"
                                variant="flushed"
                                label="password"
                                labelColor="cyan.500"
                                placeholder="password"
                                type="password"
                                required
                            />
                            <Button
                                maxW="max-content"
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                register
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Register);
