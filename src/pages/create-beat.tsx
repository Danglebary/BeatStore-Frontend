// General imports
import React from "react";
// Urql imports
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// Custom imports
import { Layout } from "../components/Wrappers/Layout";
import { CreateBeatForm } from "../components/Forms/CreateBeat/CreateBeatForm";
import { useIsAuth } from "../hooks/useIsAuth";

const CreateBeat: React.FC = () => {
    useIsAuth();

    return (
        <Layout varient="small">
            <CreateBeatForm />
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(CreateBeat);
