import { Box, Flex, GridItem, Image, SimpleGrid, Text } from "@chakra-ui/react"
import { Fragment, useEffect } from "react"
import { Helmet, } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'
import useApiGet from "../../hook/useApiGet"
import Cart from "../cart/Cart"
import LoadingSpinner from "../shared/LoadingSpinner"
import AppDivider from "../shared/AppDivider"
import ProductMenu from "./ProductMenu"
import images from "../../asset/image/images"
import Error404Page from "../shared/Error404Page"

export default function StorePage() {
    const { id } = useParams()
    const { data: store, error, loading, setLoading } = useApiGet({ endpoint: `/stores/${id}`, defaultValue: null })
    const { name, address, description, image: { url: imageUrl } = {}, subMenus = [] } = store || {}

    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])
    if (!loading && store === null) return <Error404Page />
    return (
        <Flex h='100%' pt={4} px={[4, 8, 12, 16]} mx='auto' direction='column' align='center'>
            {loading ? <LoadingSpinner /> :
                (
                    <Fragment>
                        <Helmet title={name} />
                        <SimpleGrid columns={12} w={['100%']}>
                            <GridItem colSpan={[12, null, 2]}>
                                <Box p={4}>
                                    <Image objectFit='cover' alt={name} h={[300, 200]} w='100%' src={imageUrl} />
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, null, 10]}>
                                <Box p={4}>
                                    <Text fontSize='3xl' fontWeight={600}>{name}</Text>
                                    <Text fontSize='xl'>{address}</Text>
                                    <Text fontSize='md'>{description}</Text>
                                </Box>
                            </GridItem>
                        </SimpleGrid>
                        <AppDivider />
                        <SimpleGrid spacing={4} columns={12} w='100%'>
                            <GridItem colSpan={[12, null, null, 2]}>
                                <Box p={2}>
                                    <Text fontSize='2xl' fontWeight={600}>Menu</Text>
                                    {subMenus.map(menu =>
                                        <Link to={`#${menu.name}`} key={menu.id}><Text py={2} fontSize='md'>{menu.name} ({menu.products.length})</Text></Link>
                                    )}
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, null, 8, 7]}>
                                {subMenus.map(menu => <ProductMenu key={menu.id} menu={menu} storeId={id} />)}
                            </GridItem>
                            <GridItem colSpan={[12, null, 4, 3]}>
                                <Box p={2}>
                                    <Text fontSize='2xl' fontWeight={600}>Cart</Text>
                                    <Cart storeId={id} />
                                </Box>
                            </GridItem>
                        </SimpleGrid>
                    </Fragment>
                )
            }
        </Flex >
    )
}