import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { Fragment } from "react";
import useCartsStore from "../../store/useCartsStore";
import formatCurrency from "../../util/formatCurrency";
import AppDivider from "../shared/AppDivider";

export default function CartItem({ storeId, productId }) {
    const quantity = useCartsStore(state => state.carts[storeId].products[productId].quantity)
    const product = useCartsStore(state => state.carts[storeId].products[productId].data)
    const addProductToCart = useCartsStore(state => state.addProductToCart)
    const decreaseProductQuantity = useCartsStore(state => state.decreaseProductQuantity)
    const { id, name, price } = product || {}
    return (
        <Fragment>
            <Flex align='center' py={3}>
                <IconButton
                    onClick={() => addProductToCart({ storeId, product })}
                    variant='solid'
                    colorScheme='green'
                    borderRadius='md'
                    size='xs'
                    _focus={{ boxShadow: 'none' }}
                    icon={<AddIcon />}
                />
                <Box>
                    <Text w='50px' align='center'>{quantity}</Text>
                </Box>
                <IconButton
                    onClick={() => decreaseProductQuantity({ storeId, productId })}
                    variant='solid'
                    size='xs'
                    borderRadius='md'
                    colorScheme='red'
                    _focus={{ boxShadow: 'none' }}
                    icon={<MinusIcon />}
                />
                <Box ml={4}>
                    <Text flex={3}>{name}</Text>
                </Box>
                <Box ml='auto'>
                    <Text align='right'>{formatCurrency(quantity * price)}</Text>
                </Box>
            </Flex >
            <AppDivider />
        </Fragment>

    )
}