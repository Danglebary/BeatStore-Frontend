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
import { Button } from "@chakra-ui/button";
// Custom imports
import { Layout } from "../components/Layout";
import { InputField } from "../components/InputField";
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
                        <InputField
                            name="email"
                            label="email"
                            placeholder="email@email.com"
                        />
                        <InputField
                            name="username"
                            label="username"
                            placeholder="username"
                        />
                        <InputField
                            name="password"
                            label="password"
                            placeholder="password"
                            type="password"
                        />
                        <Button type="submit" isLoading={isSubmitting}>
                            register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Register);
