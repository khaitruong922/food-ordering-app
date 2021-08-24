import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import mockProductImage from "../../mock/mockProductImage";
import useCartsStore from "../../store/useCartsStore";
import formatCurrency from "../../util/formatCurrency";

export default function Product({ product, storeId }) {
    const { id, name, price, description, image } = product || {}
    const { url: imageUrl } = image || mockProductImage
    const addProductToCart = useCartsStore(state => state.addProductToCart)
    return (
        <Flex direction='row' p={2} height='100%'>
            <Box flex={1} display='flex' alignItems='center'>
                <Image borderRadius={10} objectFit='cover' boxSize={75} src={imageUrl}></Image>
            </Box>
            <Box flex={5} ml={2}>
                <Text fontSize='lg' fontWeight={600}>{name}</Text>
                <Text fontSize='md'>{formatCurrency(price)}</Text>
                <Text fontSize='sm'>{description}</Text>
            </Box>
            <Box flex={1} ml={2} alignSelf='center'>
                <IconButton
                    isRound
                    variant='ghost'
                    _focus={{ boxShadow: 'none' }}
                    icon={<AddIcon color='green.500' />}
                    onClick={() => addProductToCart({ product, storeId })}>
                </IconButton>
            </Box>
        </Flex >
    )
}