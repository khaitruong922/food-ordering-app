import { Box, CircularProgress } from "@material-ui/core";

export default function Spinner() {
    return (
        <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
            <CircularProgress color='primary' />
        </Box>
    )
}