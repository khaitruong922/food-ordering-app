import React from 'react'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import OrderDetails from './OrderDetails'
import useApiGet from "../../hook/useApiGet"
import LoadingSpinner from "../shared/LoadingSpinner"


export default function Order() {
    const { data: orders, loading, error } = useApiGet({ endpoint: '/orders', defaultValue: [] })
    if (loading) return <LoadingSpinner />
    return <Flex align="center" direction="column" backgroundColor="blue.100"  boxShadow='lg' mt={5} py={5} px={10}>
        <SimpleGrid my="10px">
            {orders.map((order) => (
                <OrderDetails key={order.id} received_order={order} />
        
            ))}
        </SimpleGrid>

    </Flex>
}
