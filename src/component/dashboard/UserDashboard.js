import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({

}))

export default function UserDashboard() {
    const classes = useStyles()
    return (
        <Box display='flex' justifyContent='center'>
            <Typography>Users</Typography>
        </Box>
    )
}