import { Box, Button, Flex, Text } from '@chakra-ui/react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Fragment } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"
import useCartsStore from "../../store/useCartsStore"
import formatCurrency from "../../util/formatCurrency"
import CartItem from "./CartItem"

export default function Cart({ storeId }) {
    const productIds = useCartsStore(state => Object.keys(state.carts[storeId]?.products ?? {}))
    const total = useCartsStore(state => (state.carts[storeId]?.total))
    const checkout = useCartsStore(state => state.checkout)
    const createStoreCart = useCartsStore(state => state.createStoreCart)
    useEffect(() => {
        createStoreCart({ storeId })
    }, [])
    return (
        <Box p={2}>
            {productIds.map(productId => <CartItem key={productId} storeId={storeId} productId={productId} />)}
            <Box height={5} />
            {
                productIds.length > 0 ?
                    <Fragment>
                        <Flex>
                            <Text fontSize='md' fontWeight={600}>Total</Text>
                            <Box ml='auto'>
                                <Text fontSize='md' fontWeight={600} align='right'>{formatCurrency(total)}</Text>
                            </Box>
                        </Flex>
                        <Box display='flex' justifyContent='center'>
                            <Link to={`/stores/${storeId}/checkout`} >
                                <Button
                                    leftIcon={<ShoppingCartIcon color='secondary' />}
                                    variant='ghost'
                                >Checkout
                                </Button>
                            </Link>
                        </Box>
                    </Fragment> :
                    <Text align='center' variant='subtitle2'>Your cart is empty</Text>
            }

        </Box >
    )
}