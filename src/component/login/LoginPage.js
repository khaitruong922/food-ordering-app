import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useErrorToast } from '../shared/toast';
import useInput from '../../hook/useInput';
import useAuthStore from '../../store/useAuthStore';
import AppDivider from '../shared/AppDivider';

export default function LoginPage() {
    const { value: username, onInput: onUsernameInput } = useInput('')
    const { value: password, onInput: onPasswordInput } = useInput('')
    const login = useAuthStore(state => state.login)
    const errorToast = useErrorToast()
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)

    const onFormSubmit = async (e) => {
        e.preventDefault()
        await login({ username, password })
        const user = await fetchCurrentUser()
        if (!user) {
            errorToast({
                title: 'Login failed!',
                description: 'Username and password do not match.',
            })
            return
        }
    }

    return (
        <Flex direction='column' align='center' justify='center' width={400} mx='auto' boxShadow='xl' mt={5} p={5}>
            <Helmet title='Login' />
            <Text fontSize='3xl' fontWeight={600}>Sign In</Text>
            <Box width='100%' p={2}>
                <form onSubmit={onFormSubmit}>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input value={username} onInput={onUsernameInput} required />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onInput={onPasswordInput} required />
                    </FormControl>
                    <Box height={5}></Box>
                    <Button type="submit" width='100%' colorScheme='yellow'>Sign In</Button>
                </form>
            </Box>
            <Box height={5}></Box>
            <AppDivider />
            <Box height={5}></Box>
            <Text align='center'>Don't have an account? Sign up <Link id="link2" to='/signup'><Text display='inline' color='yellow.500'>here</Text></Link></Text>
        </Flex>
    )
}