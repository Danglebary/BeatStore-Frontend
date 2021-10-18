// General imports
import { useEffect } from "react";
import { useRouter } from "next/router";
// GraphQL imports
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (!fetching && !data?.me) {
            router.replace("/login?next=" + router.pathname);
        }
    }, [fetching, data, router]);
};
