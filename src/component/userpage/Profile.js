import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import useAuthStore from '../../store/useAuthStore';
import useInput from '../../hook/useInput';
import React from 'react';

export default function Profile(){
    const user = useAuthStore(state => state.user)
    const { value: name} = useInput(user ? user.name : '')
    const { value: phoneNumber} = useInput(user ? user.phoneNumber : '')
    const { value: address} = useInput(user ? user.address : '')

    return <Flex align="center" direction="column" backgroundColor="blue.100"  boxShadow='lg' mt={5} py={5} px={10}>
        <Box height="10px"></Box>
        <Box display="flex" borderRadius="5px" border="1px" borderColor="black" alignItems="center" height="40px" width="500px">
            <Text mx="10px">Name : {name}</Text>
        </Box>
        <Box height="20px"></Box>
        <Box display="flex" borderRadius="5px" border="1px" borderColor="black"  alignItems="center" height="40px" width="500px">
            <Text mx="10px">Phone Number : {phoneNumber}</Text>
        </Box>
        <Box height="20px"></Box>
        <Box display="flex" borderRadius="5px" border="1px" borderColor="black" alignItems="center" height="40px" width="500px">
            <Text mx="10px">Address : {address}</Text>
        </Box>
        <Box height="20px"></Box>
        <Center>
        <Button colorScheme="teal">Edit Profile</Button>
        </Center>
       
        <Box height="20px"></Box>
        
        
    </Flex>
}
