import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export default function Error404Page() {
    return (
        <Flex direction='column' align='center' justify='center' height='100%'>
            <Text fontSize='6xl' fontWeight={600} color='gray.800'>404 Not Found </Text>
            <Link to='/'><Text fontWeight={600} fontSize='2xl' color='yellow.700'>Return to home</Text></Link>
        </Flex>
    )
}