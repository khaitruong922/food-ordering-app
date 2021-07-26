import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Redirect } from 'react-router-dom';
import api from '../../api/api';
import useInput from '../../hook/useInput';
import useMessage from '../../hook/useMessage';
import useAuthStore from '../../store/useAuthStore';
import AppDivider from '../styled-component/AppDivider';
import FormMessage from '../styled-component/FormMessage';
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



export default function SignUpPage() {
    const classes = useStyles()

    const { value: username, onInput: onUsernameInput } = useInput('')
    const { value: name, onInput: onNameInput } = useInput('')
    const { value: email, onInput: onEmailInput } = useInput('')
    const { value: phoneNumber, onInput: onPhoneNumberInput } = useInput('')
    const { value: address, onInput: onAddressInput } = useInput('')
    const { value: password, onInput: onPasswordInput } = useInput('')
    const { value: confirmPassword, onInput: onConfirmPasswordInput } = useInput('')
    const { message, success, setErrorMessage, setSuccessMessage } = useMessage()

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrorMessage('Password does not match')
            return
        }
        try {
            const res = await api.post('/users', { username, name, email, phoneNumber, address, password })
            setSuccessMessage('Register account successfully!')
        }
        catch (e) {
            // Band aid for checking username violation - will fix later
            if (e.response.data.statusCode === 500) {
                setErrorMessage('Username is already taken!')
                return
            }
            const errorMessage = e.response.data.message[0]
            setErrorMessage(errorMessage)
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' width={400} mx='auto' boxShadow={5} mt={2} p={5}>
            <Helmet title='Sign Up' />
            <Typography variant='h6'>Sign Up</Typography>
            <form onSubmit={onFormSubmit}>
                <TextField value={username} onInput={onUsernameInput} label="Username" fullWidth required />
                <TextField value={name} onInput={onNameInput} label="Name" fullWidth required />
                <TextField value={email} onInput={onEmailInput} label="Email" fullWidth />
                <TextField value={phoneNumber} onInput={onPhoneNumberInput} label="Phone number" fullWidth required />
                <TextField value={address} onInput={onAddressInput} label="Address" fullWidth required />
                <TextField value={password} onInput={onPasswordInput} label="Password" type="password" fullWidth required />
                <TextField value={confirmPassword} onInput={onConfirmPasswordInput} label="Confirm Password" type="password" fullWidth required />
                <Box height={20}></Box>
                <Button className={classes.btn} type="submit" color='primary' variant="contained" fullWidth>Create Account</Button>
            </form>
            <Box height={50} display='flex' alignItems='center' justifyContent='center'>
                <FormMessage content={message} success={success} />
            </Box>
            <AppDivider />
            <Box height={10}></Box>
            <Typography>Already have an account? Login <Link className={classes.link} to='/login'>here</Link></Typography>
        </Box>
    )
}