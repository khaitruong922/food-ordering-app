import React from 'react'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import OrderDetails from './OrderDetails'
import useApiGet from "../../hook/useApiGet"
import LoadingSpinner from "../shared/LoadingSpinner"


export default function Order(){
    const { data: orders, loading, error } = useApiGet({ endpoint: '/orders', defaultValue: [] })
    if (loading) return <LoadingSpinner />
    return <Flex align="center" direction="column" borderRadius="15px" backgroundColor="blue.100">
        <SimpleGrid>
                {orders.map((order) => (
                    <OrderDetails key={order.id} />
                ))}
            </SimpleGrid>
        
    </Flex>
}