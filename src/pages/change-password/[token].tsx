// General imports
import React, { useState } from "react";
import { NextPage } from "next";
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
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter();

    const [{}, changePassword] = useChangePasswordMutation();

    const [tokenErr, setTokenErr] = useState("");

    return (
        <Wrapper varient="small">
            <Formik
                initialValues={{ newPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await changePassword({
                        token,
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
        </Wrapper>
    );
};

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
