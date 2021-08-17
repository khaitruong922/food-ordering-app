import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
export default function StoreCard({ store }) {
    const { id, name, address, description, image } = store
    const imageUrl = image?.url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    return (
        <Flex flexDirection='column' boxShadow='lg' borderRadius={1} p={5}>
            <Link to={`/stores/${id}`}>
                <Image objectFit='cover' height={200} w='100%' alt={name} src={imageUrl}></Image>
                <Box mt={2} w='100%' overflow='hidden'>
                    <Text maxW='sm' isTruncated fontWeight={600} fontSize='xl' textOverflow='ellipsis' >{name}</Text>
                    <Text maxW='100%' isTruncated >{address}</Text>
                </Box>
            </Link>
        </Flex>
    )
}