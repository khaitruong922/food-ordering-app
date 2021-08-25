import { extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const chakraTheme = extendTheme({
    components: {
        Steps,
    },
    fonts: {
    }
})
export default chakraTheme