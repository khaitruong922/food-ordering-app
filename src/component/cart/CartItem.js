import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { Fragment } from "react";
import useCartsStore from "../../store/useCartsStore";
import formatCurrency from "../../util/formatCurrency";
import AppDivider from "../styled-component/AppDivider";

export default function CartItem({ storeId, productId }) {
    const quantity = useCartsStore(state => state.carts[storeId].products[productId].quantity)
    const product = useCartsStore(state => state.carts[storeId].products[productId].data)
    const addProductToCart = useCartsStore(state => state.addProductToCart)
    const decreaseProductQuantity = useCartsStore(state => state.decreaseProductQuantity)
    const { id, name, price } = product || {}
    return (
        <Fragment>
            <Flex align='center' p={1}>
                <IconButton
                    onClick={() => addProductToCart({ storeId, product })}
                    variant='ghost'
                    isRound
                    _focus={{ boxShadow: 'none' }}
                    icon={<AddIcon color='green.500' />}
                />
                <Box flex={1}>
                    <Text align='center'>{quantity}</Text>
                </Box>
                <IconButton
                    onClick={() => decreaseProductQuantity({ storeId, productId })}
                    variant='ghost'
                    isRound
                    _focus={{ boxShadow: 'none' }}
                    icon={<MinusIcon />}
                />
                <Box flex={10}>
                    <Text flex={3}>{name}</Text>
                </Box>
                <Box flex={3}>
                    <Text align='right'>{formatCurrency(quantity * price)}</Text>
                </Box>
            </Flex >
            <AppDivider />
        </Fragment>

    )
}