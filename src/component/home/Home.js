import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useApiGet from "../../hook/useApiGet";
import useAuthStore from "../../store/useAuthStore";
import LoadingSpinner from "../shared/LoadingSpinner";
import StoreCard from "./StoreCard";

function Category({ category, onClick, isSelected }) {
    const { name } = category
    return <Button _focus={{ boxShadow: 'none' }} p={4} fontSize='lg' borderRadius='xl' ml={2} colorScheme={isSelected ? 'whatsapp' : 'gray'} onClick={onClick}>{name}</Button>
}

export default function Home() {
    const user = useAuthStore(state => state.user)
    const { data: stores, loading: storesLoading } = useApiGet({ endpoint: '/stores', defaultValue: [] })
    const { data: categories, loading: categoriesLoading } = useApiGet({ endpoint: '/categories', defaultValue: [] })
    const [selectedCategory, setSelectedCategory] = useState(-1)
    const displayedStores = stores.filter(store => selectedCategory == -1 || store.categories?.some(category => category.id === selectedCategory))
    if (storesLoading) return <LoadingSpinner />
    return (
        <Box width='80%' mx='auto' mt={2}>
            <Helmet title='DeliV' />
            <Flex p={4}>
                {
                    categoriesLoading ? <LoadingSpinner /> :
                        <>
                            <Category key={-1} category={{ name: 'ALL' }} onClick={() => setSelectedCategory(-1)} isSelected={selectedCategory == -1} />
                            {categories.map(category =>
                                <Category key={category.id} category={category} onClick={() => setSelectedCategory(category.id)} isSelected={selectedCategory == category.id} />)
                            }
                        </>
                }
            </Flex>
            <SimpleGrid
                columns={[1, 2, 3, 4]}
                spacing={3}
            >
                {
                    displayedStores.map((store) => (
                        <StoreCard key={store.id} store={store} />
                    ))
                }
            </SimpleGrid>
        </Box >

    )
}