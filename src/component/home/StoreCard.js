import { StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import placeholder from '../../asset/image/placeholder.png'
export default function StoreCard({ store }) {
    const { id, name, address, image } = store
    const imageUrl = image?.url
    return (
        <Flex flexDirection='column' boxShadow='md' borderRadius='2xl'>
            <Link to={`/stores/${id}`}>
                <Image borderRadius='2xl' objectFit='cover' height={200} w='100%' alt={name} fallbackSrc={placeholder} src={imageUrl}></Image>
                <Box mt={2} px={4} pb={2} w='100%' overflow='hidden'>
                    <Flex>
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