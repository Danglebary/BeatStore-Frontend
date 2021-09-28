// Chakra imports
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
// Custom imports
import theme from "../theme";

const MyApp = ({ Component, pageProps }: any) => {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <ColorModeProvider
                options={{
                    useSystemColorMode: true
                }}
            >
                <Component {...pageProps} />
            </ColorModeProvider>
        </ChakraProvider>
    );
};

export default MyApp;
