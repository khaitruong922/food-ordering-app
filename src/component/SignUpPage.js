import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../api/api';
import useInput from '../hook/useInput';
import useAuthStore from '../store/useAuthStore';
import AppDivider from '../styled-component/AppDivider';
const useStyles = makeStyles((theme) => (
    {
        btn: {
            borderRadius: '10px',
        },
        link: {
            textDecoration: "none",
        },
        error: {
            fontWeight: 500,
        },
        success: {
            color: '#0f0',
            fontWeight: 500,
        }
    })
)

function FormMessage({ content, success }) {
    const classes = useStyles()
    if (success) return (<Typography align='center' className={classes.success}>{content}</Typography>)
    return (<Typography align='center' className={classes.error} color='error'>{content}</Typography>)
}

export default function SignUpPage() {
    const classes = useStyles()
    const user = useAuthStore(state => state.user)

    const { value: username, onChange: onUsernameChange } = useInput('')
    const { value: name, onChange: onNameChange } = useInput('')
    const { value: email, onChange: onEmailChange } = useInput('')
    const { value: phoneNumber, onChange: onPhoneNumberChange } = useInput('')
    const { value: address, onChange: onAddressChange } = useInput('')
    const { value: password, onChange: onPasswordhange } = useInput('')
    const { value: confirmPassword, onChange: onConfirmPasswordChange } = useInput('')
    const [message, setMessage] = useState({ content: '', success: false })

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage({ content: 'Passwords do not match', success: false, })
            return
        }
        try {
            const res = await api.post('/users', { username, name, email, phoneNumber, address, password })
            setMessage({ content: 'Register account successfully!', success: true, })
        }
        catch (e) {
            // Band aid for checking username violation - will fix later
            if (e.response.data.statusCode === 500) {
                setMessage({ content: 'Username is already taken!', success: false, })
                return
            }
            const message = e.response.data.message[0]
            setMessage({ content: message, success: false, })
        }

    }

    if (user) return (<Redirect to='/' />)

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' width={400} mx='auto' boxShadow={5} mt={2} p={5}>
            <Typography variant='h6'>Sign Up</Typography>
            <form onSubmit={onFormSubmit}>
                <TextField value={username} onChange={onUsernameChange} label="Username" fullWidth required />
                <TextField value={name} onChange={onNameChange} label="Name" fullWidth required />
                <TextField value={email} onChange={onEmailChange} label="Email" fullWidth />
                <TextField value={phoneNumber} onChange={onPhoneNumberChange} label="Phone number" fullWidth required />
                <TextField value={address} onChange={onAddressChange} label="Address" fullWidth required />
                <TextField value={password} onChange={onPasswordhange} label="Password" type="password" fullWidth required />
                <TextField value={confirmPassword} onChange={onConfirmPasswordChange} label="Confirm Password" type="password" fullWidth required />
                <Box height={20}></Box>
                <Button className={classes.btn} type="submit" color='primary' variant="contained" fullWidth>Create Account</Button>
            </form>
            <Box height={50} display='flex' alignItems='center' justifyContent='center'>
                <FormMessage content={message.content} success={message.success} />
            </Box>
            <AppDivider />
            <Box height={10}></Box>
            <Typography>Already have an account? Login <Link className={classes.link} to='/register'>here</Link></Typography>
        </Box>
    )
}