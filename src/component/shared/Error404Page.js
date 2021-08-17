import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export default function Error404Page() {
    return (
        <Flex direction='column' align='center' justify='center' height='100%'>
            <Text fontSize='9xl' fontWeight={600} color='gray.800'>404</Text>
            <Text fontSize='5xl' fontWeight={700} color='gray.800'>Not Found</Text>
            <Link to='/'><Text fontSize='xl' color='yellow.700'>Return to home</Text></Link>
        </Flex>
    )
}