import { Box, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
export default function Error404Page() {
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
            <Typography variant='h3'>404 Not Found</Typography>
            <Link style={{ textDecoration: 'none' }} to='/'><Typography variant='h6'>Return to home</Typography></Link>
        </Box>
    )
}