// General imports
import React, { useState } from "react";
import NextLink from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
// GraphQL imports
import { useChangePasswordMutation } from "../../generated/graphql";
// Chakra imports
import { Button } from "@chakra-ui/react";
import { Box, Flex, Link } from "@chakra-ui/layout";
// Custom imports
import { Layout } from "../../components/Wrappers/Layout";
import { InputField } from "../../components/InputFields/InputField";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: React.FC = () => {
    const router = useRouter();

    const [{}, changePassword] = useChangePasswordMutation();

    const [tokenErr, setTokenErr] = useState("");

    return (
        <Layout varient="small">
            <Formik
                initialValues={{ newPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await changePassword({
                        token:
                            typeof router.query.token === "string"
                                ? router.query.token
                                : "",
                        newPassword: values.newPassword
                    });
                    if (res.data?.changePassword.errors) {
                        const errorMap = toErrorMap(
                            res.data.changePassword.errors
                        );
                        if ("token" in errorMap) {
                            setTokenErr(errorMap.token);
                        }
                        setErrors(errorMap);
                    } else if (res.data?.changePassword.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            label="new password"
                            placeholder="password"
                            type="password"
                        />
                        {!tokenErr ? null : (
                            <Flex gridGap="1em">
                                <Box color="red">{tokenErr}</Box>
                                <NextLink href="/forgot-password">
                                    <Link>click here to get a new one</Link>
                                </NextLink>
                            </Flex>
                        )}
                        <Button type="submit" isLoading={isSubmitting}>
                            submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
