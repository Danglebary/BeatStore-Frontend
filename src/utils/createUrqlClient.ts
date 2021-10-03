// Urql imports
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import {
    dedupExchange,
    Exchange,
    fetchExchange,
    stringifyVariables
} from "urql";
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

const cursorPagination = (): Resolver => {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;

        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(
            (info) => info.fieldName === fieldName
        );
        const size = fieldInfos.length;

        if (size === 0) return undefined;

        const results: string[] = [];

        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
        const isInCache = cache.resolve(
            cache.resolve(entityKey, fieldKey) as string,
            "beats"
        );
        info.partial = !isInCache;
        let hasMore = true;
        fieldInfos.forEach((fi) => {
            const key = cache.resolve(entityKey, fi.fieldKey) as string;
            const data = cache.resolve(key, "beats") as string[];
            const _hasMore = cache.resolve(key, "hasMore");
            if (!_hasMore) {
                hasMore = false;
            }
            results.push(...data);
        });

        return {
            __typename: "PaginatedBeatsResponse",
            hasMore,
            beats: results
        };
    };
};

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:1337/graphql",
    fetchOptions: {
        credentials: "include" as const
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            keys: {
                PaginatedBeats: () => null
            },
            resolvers: {
                Query: {
                    beats: cursorPagination()
                }
            },
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
