// Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import { AudioContextProvider } from "../contexts/audioContext";
// Custom imports
import theme from "../theme";

const MyApp = ({ Component, pageProps }: any) => {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <AudioContextProvider>
                <Component {...pageProps} />
            </AudioContextProvider>
        </ChakraProvider>
    );
};

export default MyApp;
