import { AddIcon, PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text, Button, Icon } from "@chakra-ui/react";
import { IoCartOutline } from 'react-icons/io5'

import mockProductImage from "../../mock/mockProductImage";
import useCartsStore from "../../store/useCartsStore";
import formatCurrency from "../../util/formatCurrency";

export default function Product({ product, storeId }) {
    const { id, name, price, description, image } = product || {}
    const { url: imageUrl } = image || mockProductImage
    const addProductToCart = useCartsStore(state => state.addProductToCart)
    return (
        <Flex direction='row' p={2} height='100%'>
            <Box w={75} display='flex' alignItems='center'>
                <Image borderRadius={10} objectFit='cover' boxSize={75} src={imageUrl}></Image>
            </Box>
            <Box ml={4}>
                <Text fontSize='lg' fontWeight={600}>{name}</Text>
                <Text fontSize='md'>{formatCurrency(price)}</Text>
                <Text fontSize='sm'>{description}</Text>
            </Box>
            <Box ml='auto' mr={4} alignSelf='center'>
                <Button
                    borderRadius='md'
                    colorScheme='yellow'
                    variant='outline'
                    size='md'
                    _focus={{ boxShadow: 'none' }}
                    rightIcon={<IoCartOutline />}
                    onClick={() => addProductToCart({ product, storeId })}>
                    <Text>ADD</Text>
                </Button>
            </Box>
        </Flex >
    )
}