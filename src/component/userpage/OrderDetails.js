import { Text, Box, Flex, Button } from '@chakra-ui/react'
import React from 'react'


export default function OrderDetails({received_order}) {
    const {id, name, address, phoneNumber, note, status, totalPrice } = received_order
    return <Flex align="center" direction="column" backgroundColor="blue.100"  boxShadow='lg' mt={5} py={5} px={10}>
            
            <Box height="10px" />
            <Text mx="15px">
                Order ID: {id}
            </Text>
            <Box height="5px" />
            <Text mx="15px">
                Name : {name}
            </Text>
            <Box height="5px" />
            <Text mx="15px">
                Address : {address}
            </Text>
            <Box height="5px" />
            <Text mx="15px">
                Phone Number : {phoneNumber}
            </Text>
            <Box height="5px" />
            <Text mx="15px">
               Note : {note}
            </Text>
            <Box height="5px" />
            <Text mx="15px">
                Price : {totalPrice} $
            </Text>
            <Box height="5px" />
            <Text mx="15px">
                Status : {status}
            </Text>
            <Button colorScheme="teal">
                Order Details
            </Button>
        </Flex>
}
