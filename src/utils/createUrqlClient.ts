// Urql imports
import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import {
    LoginMutation,
    MeQuery,
    MeDocument,
    RegisterMutation,
    LogoutMutation
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";

const errorExchange: Exchange =
    ({ forward }) =>
    (ops$) => {
        return pipe(
            forward(ops$),
            tap(({ error }) => {
                if (error) {
                    if (error.message.includes("not authenticated")) {
                        Router.replace("/login");
                    }
                }
            })
        );
    };

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:1337/graphql",
    fetchOptions: {
        credentials: "include" as const
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    login: (result, _args, cache, _info) => {
                        betterUpdateQuery<LoginMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            result,
                            (res, query) => {
                                if (res.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: res.login.user
                                    };
                                }
                            }
                        );
                    },
                    register: (result, _args, cache, _info) => {
                        betterUpdateQuery<RegisterMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            result,
                            (res, query) => {
                                if (res.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: res.register.user
                                    };
                                }
                            }
                        );
                    },
                    logout: (result, _args, cache, _info) => {
                        betterUpdateQuery<LogoutMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            result,
                            () => ({ me: null })
                        );
                    }
                }
            }
        }),
        errorExchange,
        ssrExchange,
        fetchExchange
    ]
});
