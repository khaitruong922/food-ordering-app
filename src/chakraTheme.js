import { extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const chakraTheme = extendTheme({
    components: {
        Steps,
    },
    fonts: {
        heading: 'Open Sans',
        body: 'Open Sans'
    }
})
export default chakraTheme