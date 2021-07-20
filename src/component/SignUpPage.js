import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import AppDivider from '../styled-component/AppDivider';
const useStyles = makeStyles((theme) => (
    {
        btn: {
            borderRadius: '10px',
        },
        link: {
            textDecoration: "none",
        }
    })
)
export default function SignUpPage() {
    const classes = useStyles()
    const user = useAuthStore(state => state.user)
    if (user) return (<Redirect to='/' />)
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' width={300} mx='auto' boxShadow={5} mt={2} p={5}>
            <Typography variant='h6'>Sign Up</Typography>
            <TextField label="Name" fullWidth required />
            <TextField label="Email" fullWidth />
            <TextField label="Phone" fullWidth required />
            <TextField label="Address" fullWidth required />
            <TextField label="Username" fullWidth required />
            <TextField label="Password" type="password" fullWidth required />
            <TextField label="Confirm Password" type="password" fullWidth required />
            <Box height={20}></Box>
            <Button className={classes.btn} type="submit" color='primary' variant="contained" fullWidth>Create Account</Button>
            <Box height={20}></Box>
            <AppDivider />
            <Box height={10}></Box>
            <Typography>Already have an account? Login <Link className={classes.link} to='/register'>here</Link></Typography>
        </Box>
    )
}