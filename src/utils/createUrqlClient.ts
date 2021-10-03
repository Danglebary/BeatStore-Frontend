// General imports
import Router from "next/router";
// Urql imports
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import {
    dedupExchange,
    Exchange,
    fetchExchange,
    stringifyVariables
} from "urql";
import { pipe, tap } from "wonka";
import gql from "graphql-tag";
// GraphQL imports
import {
    LoginMutation,
    MeQuery,
    MeDocument,
    RegisterMutation,
    LogoutMutation,
    LikeBeatMutationVariables
} from "../generated/graphql";
// Custom imports
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from "./isServer";

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

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
    let cookie = "";
    if (isServer()) {
        cookie = ctx.req.headers.cookie;
    }

    return {
        url: "http://localhost:1337/graphql",
        fetchOptions: {
            credentials: "include" as const,
            headers: cookie
                ? {
                      cookie
                  }
                : undefined
        },
        exchanges: [
            dedupExchange,
            cacheExchange({
                keys: {
                    PaginatedBeatsResponse: () => null
                },
                resolvers: {
                    Query: {
                        beats: cursorPagination()
                    }
                },
                updates: {
                    Mutation: {
                        likeBeat: (_result, args, cache, _info) => {
                            const { beatId } =
                                args as LikeBeatMutationVariables;
                            const data = cache.readFragment(
                                gql`
                                    fragment _ on Beat {
                                        id
                                        likesCount
                                        likeStatus
                                    }
                                `,
                                { id: beatId } as any
                            );
                            if (data) {
                                const newLikesCount = data.likeStatus
                                    ? data.likesCount + 1
                                    : data.likesCount - 1;
                                const newLikeStatus = !data.likeStatus;
                                cache.writeFragment(
                                    gql`
                                        fragment __ on Beat {
                                            likesCount
                                            likeStatus
                                        }
                                    `,
                                    {
                                        id: beatId,
                                        likesCount: newLikesCount,
                                        likeStatus: newLikeStatus
                                    }
                                );
                            }
                        },
                        createBeat: (_result, _args, cache, _info) => {
                            const key = "Query";
                            const fieldToInvalidate = "beats";
                            const allFields = cache.inspectFields(key);
                            const fieldInfos = allFields.filter(
                                (info) => info.fieldName === fieldToInvalidate
                            );
                            fieldInfos.forEach((fi) => {
                                cache.invalidate(
                                    key,
                                    fieldToInvalidate,
                                    fi.arguments
                                );
                            });
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
    };
};
