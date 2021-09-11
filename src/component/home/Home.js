import { CheckIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { IoLocationOutline } from 'react-icons/io5'
import { Box, Button, Flex, SimpleGrid, Text, Icon, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import images from "../../asset/image/images";
import useApiGet from "../../hook/useApiGet";
import useAuthStore from "../../store/useAuthStore";
import LoadingSpinner from "../shared/LoadingSpinner";
import StoreCard from "./StoreCard";

function Category({ category, onClick, isSelected }) {
    const { name } = category
    return <Button _focus={{ boxShadow: 'none' }} p={4} fontSize='lg' borderRadius='xl' ml={2} colorScheme={isSelected ? 'orange' : 'gray'} onClick={onClick}>{name}</Button>
}

export default function Home() {
    const user = useAuthStore(state => state.user)
    const { data: stores, loading: storesLoading } = useApiGet({ endpoint: '/stores', defaultValue: [] })
    const { data: categories, loading: categoriesLoading } = useApiGet({ endpoint: '/categories', defaultValue: [] })
    const [selectedCategory, setSelectedCategory] = useState(-1)
    const displayedStores = stores.filter(store => selectedCategory === -1 || store.categories?.some(category => category.id === selectedCategory))
    return (
        <Box h='100%'>
            <Helmet title='DeliV' />
            <Box bgImage={images.landing} width='100%' height={500} backgroundSize='cover' backgroundRepeat='no-repeat' backgroundPosition='center'>
                <Flex flexDirection='column' align='center' justify='center' width='100%' height='100%' bgColor='blackAlpha.800'>
                    <Text lineHeight='100%' fontFamily='fantasy' fontSize='9xl' color='white'>DeliV</Text>
                    <Text color='white' fontSize='xl'>Deliver your favorite food faster than your hunger</Text>
                </Flex>
            </Box>
            <Box w='80%' m='auto' pb={10} minH='75%'>
                <Flex p={4}>
                    {
                        categoriesLoading ? <LoadingSpinner /> :
                            <>
                                <Category key={-1} category={{ name: 'ALL' }} onClick={() => setSelectedCategory(-1)} isSelected={selectedCategory === -1} />
                                {categories.map(category =>
                                    <Category key={category.id} category={category} onClick={() => setSelectedCategory(category.id)} isSelected={selectedCategory === category.id} />)
                                }
                            </>
                    }
                </Flex>
                {storesLoading ? <LoadingSpinner /> :
                    <SimpleGrid
                        columns={[1, 2, 3, 4]}
                        spacing={5}
                    >
                        {

                            displayedStores.map((store) => (
                                <StoreCard key={store.id} store={store} />
                            ))
                        }
                    </SimpleGrid>
                }

            </Box>
            <Flex p={6} direction='column' align='center' bgColor='gray.900' color='white'>
                <Text mb={2} fontWeight={600} fontSize='xl'>Contact us</Text>
                <Flex align='center' height={25}>
                    <Icon as={PhoneIcon} />
                    <Text mx={2}>+84 90 123 4567</Text>
                    <Divider orientation='vertical' size='lg' />
                    <Icon ml={2} as={EmailIcon} />
                    <Text mx={2}>support@deliv.com</Text>
                </Flex>
            </Flex>

        </Box >

    )
}