// General imports
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import { Formik, Form } from "formik";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// GraphQL imports
import { useLoginMutation } from "../generated/graphql";
// Chakra imports
import { Button } from "@chakra-ui/button";
// Custom imports
import { Layout } from "../components/Layout";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { Flex, Link } from "@chakra-ui/layout";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();

    const [{}, login] = useLoginMutation();

    return (
        <Layout varient="small">
            <Formik
                initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await login({ options: values });
                    if (res.data?.login.errors) {
                        setErrors(toErrorMap(res.data.login.errors));
                    } else if (res.data?.login.user) {
                        if (typeof router.query.next === "string") {
                            router.push(router.query.next);
                        } else {
                            router.push("/");
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            label="username or email"
                            placeholder="username or email"
                        />
                        <InputField
                            name="password"
                            label="password"
                            placeholder="password"
                            type="password"
                        />
                        <Flex mt="0.5em">
                            <NextLink href="/forgot-password">
                                <Link ml="auto">forgot password?</Link>
                            </NextLink>
                        </Flex>
                        <Button type="submit" isLoading={isSubmitting}>
                            login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Login);
