import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import mockProductImage from "../../mock/mockProductImage";
import useCartsStore from "../../store/useCartsStore";
import formatCurrency from "../../util/formatCurrency";

export default function Product({ product, storeId }) {
    const { id, name, price, description, image } = product || {}
    const { url: imageUrl } = image || mockProductImage
    const addProductToCart = useCartsStore(state => state.addProductToCart)
    return (
        <Flex direction='row' boxShadow='lg' p={5} height='100%'>
            <Box flex={1} display='flex' alignItems='center'>
                <Image objectFit='cover' width='100%' height={75} src={imageUrl}></Image>
            </Box>
            <Box flex={5} ml={2}>
                <Text fontSize='xl' fontWeight={500}>{name}</Text>
                <Text fontSize='md'>{formatCurrency(price)}</Text>
                <Text >{description}</Text>
            </Box>
            <Box flex={1} ml={2} alignSelf='center'>
                <IconButton
                    isRound
                    variant='ghost'
                    _focus={{ boxShadow: 'none' }}
                    icon={<AddCircleIcon color='secondary' />}
                    onClick={() => addProductToCart({ product, storeId })}>
                </IconButton>
            </Box>
        </Flex >
    )
}