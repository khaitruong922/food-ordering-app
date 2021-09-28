import { Box, SimpleGrid, Text } from "@chakra-ui/react"
import { Fragment } from "react"
import AppDivider from "../shared/AppDivider"
import Product from "./Product"

export default function ProductMenu({ menu, storeId }) {
    const { id, name = 'Menu', products = [], } = menu
    return (
        <Box py={2} id={name}>
            <Text fontSize='2xl' fontWeight={600}>{name} ({products.length})</Text>
            <SimpleGrid py={4} column={1}>
                {products.map(product => (
                    <Product key={product.id} storeId={storeId} product={product} />
                ))}
            </SimpleGrid >
            <AppDivider />
        </Box>
    )
}