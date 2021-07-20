import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import useInput from '../hook/useInput';
import useAuthStore from '../store/useAuthStore';
import AppDivider from '../styled-component/AppDivider';
const useStyles = makeStyles((theme) => ({
    btn: {
        borderRadius: '10px',
    },
    link: {
        textDecoration: "none",
    }
})
)
export default function LoginPage() {
    const classes = useStyles()
    const usernameInput = useInput('')
    const passwordInput = useInput('')
    const login = useAuthStore(state => state.login)
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
    const user = useAuthStore(state => state.user)

    const onFormSubmit = async (e) => {
        e.preventDefault()
        console.log(usernameInput.value)
        await login({ username: usernameInput.value, password: passwordInput.value })
        const user = await fetchCurrentUser()
        if (!user) {
            console.log('Login failed!')
            return
        }
    }

    if (user) return <Redirect to='/' />

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' width={300} mx='auto' boxShadow={5} mt={2} p={5}>
            <Typography variant='h6'>Sign In</Typography>
            <form onSubmit={onFormSubmit}>
                <TextField value={usernameInput.value} onChange={usernameInput.onChange} label="Username" fullWidth required />
                <TextField value={passwordInput.value} onChange={passwordInput.onChange} label="Password" type="password" fullWidth required />
                <FormControlLabel className={classes.text} control={<Checkbox name="checkedB" color="primary" />} label="Remember Me" />
                <Box height={20}></Box>
                <Button className={classes.btn} type="submit" variant="contained" color='primary' fullWidth>Sign In</Button>
            </form>
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