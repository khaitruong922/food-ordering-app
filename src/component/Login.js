import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { Link } from 'react-router-dom';
import AppDivider from '../styled-component/AppDivider';
const useStyles = makeStyles((theme) => ({}))

export default function Login() {
    const classes = useStyles()
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' width={300} mx='auto' boxShadow={5} mt={2} p={5}>
            <Typography variant='h6'>Sign In</Typography>
            <TextField label="Username" fullWidth required />
            <TextField label="Password" type="password" fullWidth required />
            <FormControlLabel className={classes.text}
                control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Remember Me"
            />
            <Box height={20}></Box>
            <Button className={classes.btn} type="submit" variant="contained" color='primary' fullWidth>Sign In</Button>
            <Box height={20}></Box>
            <Typography align="center">
                <Link className={classes.link} to="#">
                    Forgot Password?
                </Link>
            </Typography>
            <Box height={10}></Box>
            <AppDivider />
            <Box height={10}></Box>
            <Typography align='center'>Don't have an account? Register <Link className={classes.link} to='/register'>here</Link></Typography>
        </Box>
    )
}