import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useHistory } from 'react-router-dom';
import useInput from '../../hook/useInput';
import useMessage from '../../hook/useMessage';
import useAuthStore from '../../store/useAuthStore';
import AppDivider from '.././styled-component/AppDivider';
import FormMessage from '.././styled-component/FormMessage';
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
    const { value: username, onInput: onUsernameInput } = useInput('')
    const { value: password, onInput: onPasswordInput } = useInput('')
    const { message, success, setErrorMessage } = useMessage()
    const history = useHistory()
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
            <Helmet title='Login' />
            <Typography variant='h6'>Sign In</Typography>
            <form onSubmit={onFormSubmit}>
                <TextField value={username} onInput={onUsernameInput} label="Username" fullWidth required />
                <TextField value={password} onInput={onPasswordInput} label="Password" type="password" fullWidth required />
                <FormControlLabel className={classes.text} control={<Checkbox name="checkedB" color="primary" />} label="Remember Me" />
                <Box height={20}></Box>
                <Button className={classes.btn} type="submit" variant="contained" color='primary' fullWidth>Sign In</Button>
            </form>
            <Box height={50} display='flex' alignItems='center'>
                <FormMessage success={success} content={message} />
            </Box>
            <Typography align="center">
                <Link className={classes.link} to="#">
                    Forgot Password ?
                </Link>
            </Typography>

            <Box height={10}></Box>
            <AppDivider />
            <Box height={10}></Box>
            <Typography align='center'>Don't have an account? Sign up <Link id="link" className={classes.link} to='/signup'>here</Link></Typography>
        </Box>
    )
}