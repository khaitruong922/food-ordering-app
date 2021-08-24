import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import useInput from '../../hook/useInput';
import { useErrorToast, useSuccessToast } from '../shared/toast';
import AppDivider from '../styled-component/AppDivider';


export default function SignUpPage() {
    const { value: username, onInput: onUsernameInput } = useInput('')
    const { value: name, onInput: onNameInput } = useInput('')
    const { value: email, onInput: onEmailInput } = useInput('')
    const { value: phoneNumber, onInput: onPhoneNumberInput } = useInput('')
    const { value: address, onInput: onAddressInput } = useInput('')
    const { value: password, onInput: onPasswordInput } = useInput('')
    const { value: confirmPassword, onInput: onConfirmPasswordInput } = useInput('')
    const [submitting, setSubmitting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            errorToast({
                title: 'Password do not match!',
            })
            return
        }
        setSubmitting(true)
        try {
            await api.post('/users', { username, name, email, phoneNumber, address, password })
            successToast({
                title: 'Register account successfully!',
            })
        }
        catch (e) {
            const message =
                e.response.data.statusCode === 500 ?
                    'Username is already taken!' :
                    e.response.data.message[0]
            errorToast({
                title: 'Sign up failed!',
                description: message,
            })
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <Flex direction='column' align='center' justify='center' width={400} mx='auto' boxShadow='xl' mt={5} p={5}>
            <Helmet title='Sign Up' />
            <Text fontSize='3xl' fontWeight={700}>Sign Up</Text>
            <Box width='100%' p={2}>
                <form onSubmit={onFormSubmit}>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input value={username} onInput={onUsernameInput} required />
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input value={name} onInput={onNameInput} required />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input type='email' value={email} onInput={onEmailInput} required />
                    </FormControl>
                    <FormControl id="phoneNumber">
                        <FormLabel>Phone Number</FormLabel>
                        <Input type='tel' value={phoneNumber} onInput={onPhoneNumberInput} required />
                    </FormControl>
                    <FormControl id="address">
                        <FormLabel>Address</FormLabel>
                        <Input value={address} onInput={onAddressInput} required />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onInput={onPasswordInput} required />
                    </FormControl>
                    <FormControl id="address">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type='password' value={confirmPassword} onInput={onConfirmPasswordInput} required />
                    </FormControl>
                    <Box height={5}></Box>
                    <Button type="submit" width='100%' colorScheme='yellow'>Sign Up</Button>
                </form>
            </Box>
            <Box height={5}></Box>
            <AppDivider />
            <Box height={5}></Box>
            <Text align='center'>Already have an account? Log in <Link to='/login'><Text display='inline' color='yellow.500'>here</Text></Link></Text>
        </Flex>
    )
}