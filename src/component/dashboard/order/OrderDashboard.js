import { Flex } from "@chakra-ui/react";
import React from 'react';
import useApiGet from "../../../hook/useApiGet";

export default function OrderDashboard() {
    const { data: orders, loading, error } = useApiGet({ endpoint: '/orders', defaultValue: [] })
    return (
        <Flex direction='column' p={4}>
        </Flex>
    )
}