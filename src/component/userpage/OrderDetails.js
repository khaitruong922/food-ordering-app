import { Text, Box } from '@chakra-ui/react'
import React from 'react'


export default function OrderDetails() {
    // const { name, address, phoneNumber, note, status, totalPrice } = order
    return <Box display="flex" direction="column" borderRadius="20px" border="1px" borderColor="black" alignItems="center" height="150px" width="500px">

            <Box height="20px" />

            <Text>
                Name : 
            </Text>

            <Box height="20px" />

            <Text>
                Address : 
            </Text>

            <Box height="20px" />

            <Text>
                Phone Number : 
            </Text>

            <Box height="20px" />
            <Text>
               Note : 
            </Text>

            <Box height="20px" />

            <Text>
                Price : 
            </Text>

            <Box height="20px" />

            <Text>
                Status : 
            </Text>
        </Box>
}
