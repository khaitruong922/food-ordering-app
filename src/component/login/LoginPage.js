import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useInput from '../../hook/useInput';
import useAuthStore from '../../store/useAuthStore';
import AppDivider from '../shared/AppDivider';
import { useErrorToast } from '../shared/toast';

export default function LoginPage() {
    const { value: username, onInput: onUsernameInput } = useInput('')
    const { value: password, onInput: onPasswordInput } = useInput('')
    const login = useAuthStore(state => state.login)
    const errorToast = useErrorToast()
    const [submitting, setSubmitting] = useState(false)
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)

    const onFormSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const token = await login({ username, password })
        if (!token) {
            errorToast({
                title: 'Login failed',
                description: 'Username and password do not match.',
            })
            setSubmitting(false)
            return
        }
        const user = await fetchCurrentUser()
        if (!user) {
            errorToast({
                title: 'Cannot fetch user',
                description: 'Please enable cookie to login.',
            })
            setSubmitting(false)
            return
        }

    }

    return (
        <Flex direction='column' align='center' justify='center' width={400} mx='auto' boxShadow='xl' mt={5} p={5}>
            <Helmet title='Login' />
            <Text fontSize='3xl' fontWeight={600}>Login</Text>
            <Box width='100%' p={2}>
                <form onSubmit={onFormSubmit}>
                    <FormControl mt={2} id="username">
                        <FormLabel>Username</FormLabel>
                        <Input value={username} onInput={onUsernameInput} required />
                    </FormControl>
                    <FormControl mt={2} id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onInput={onPasswordInput} required />
                    </FormControl>
                    <Box height={5}></Box>
                    <Button isLoading={submitting} type="submit" width='100%' colorScheme='yellow'>Login</Button>
                </form>
            </Box>
            <Box height={3}></Box>
            <AppDivider />
            <Box height={3}></Box>
            <Text align='center'>Don't have an account? Sign up <Link to='/register'><Text display='inline' color='yellow.500'>here</Text></Link></Text>
        </Flex>
    )
}