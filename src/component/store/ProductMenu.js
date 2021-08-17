import { Box, SimpleGrid, Text } from "@chakra-ui/react"
import { Fragment } from "react"
import Product from "./Product"

export default function ProductMenu({ menu, storeId }) {
    const { id, name = 'Menu', products = [], } = menu
    if (products?.length === 0) return <Fragment />
    return (
        <Box p={2}>
            <Text fontSize='2xl'>{name}</Text>
            <Box height={10} />
            <SimpleGrid container column={1}>
                {products.map(product => (
                    <Product key={product.id} storeId={storeId} product={product} />
                ))}
            </SimpleGrid >
        </Box>
    )
}