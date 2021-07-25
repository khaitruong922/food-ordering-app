import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useInput from '../hook/useInput';
import useAuthStore from '../store/useAuthStore';
import AppDivider from './styled-component/AppDivider';
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
    const { value: username, onChange: onUsernameChange } = useInput('')
    const { value: password, onChange: onPasswordChange } = useInput('')
    const [errorMessage, setErrorMessage] = useState('')
    const login = useAuthStore(state => state.login)
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)

    const onFormSubmit = async (e) => {
        e.preventDefault()
        await login({ username, password })
        const user = await fetchCurrentUser()
        if (!user) {
            setErrorMessage('Username and password do not match!')
            return
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' width={400} mx='auto' boxShadow={5} mt={2} p={5}>
            <Typography variant='h6'>Sign In</Typography>
            <form onSubmit={onFormSubmit}>
                <TextField value={username} onChange={onUsernameChange} label="Username" fullWidth required />
                <TextField value={password} onChange={onPasswordChange} label="Password" type="password" fullWidth required />
                <FormControlLabel className={classes.text} control={<Checkbox name="checkedB" color="primary" />} label="Remember Me" />
                <Box height={20}></Box>
                <Button className={classes.btn} type="submit" variant="contained" color='primary' fullWidth>Sign In</Button>
            </form>
            <Box height={50} display='flex' alignItems='center'>
                <Typography color='error'>{errorMessage}</Typography>
            </Box>
            <Typography align="center">
                <Link className={classes.link} to="#">
                    Forgot Password?
                </Link>
            </Typography>

            <Box height={10}></Box>
            <AppDivider />
            <Box height={10}></Box>
            <Typography align='center'>Don't have an account? Sign up <Link className={classes.link} to='/signup'>here</Link></Typography>
        </Box>
    )
}