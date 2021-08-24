import { StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
export default function StoreCard({ store }) {
    const { id, name, address, description, image } = store
    const imageUrl = image?.url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    return (
        <Flex flexDirection='column'>
            <Link to={`/stores/${id}`}>
                <Image borderRadius='2xl' objectFit='cover' height={200} w='100%' alt={name} src={imageUrl}></Image>
                <Box mt={2} w='100%' overflow='hidden'>
                    <Flex mb={2}>
                        <Text maxW='sm' isTruncated fontWeight={600} fontSize='xl' textOverflow='ellipsis' >{name}</Text>
                        <Flex px={2} ml='auto' align='center' justify='center' borderRadius='xl' bgColor='green.500' color='white'>
                            <Text fontSize='sm' fontWeight={600} mr={1}>5.0</Text>
                            <Icon boxSize='3' as={StarIcon}></Icon>
                        </Flex>
                    </Flex>
                    <Text maxW='100%' isTruncated fontSize='sm' >{address}</Text>
                </Box>
            </Link>
        </Flex>
    )
}