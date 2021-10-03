// General imports
import React from "react";
import { useRouter } from "next/router";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Beat: React.FC = () => {
    const router = useRouter();
    const id = router.query.id;
    return <div>beat page for beat with id: {id}</div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Beat);
