import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, GridItem, Icon, IconButton, Image, Input, SimpleGrid, Text, useBoolean } from '@chakra-ui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Helmet } from "react-helmet-async"
import { MdLaunch } from 'react-icons/md'
import { Link, useHistory, useParams } from "react-router-dom"
import api from '../../../api/api'
import useApiGet from '../../../hook/useApiGet'
import useInput from '../../../hook/useInput'
import formatCurrency from '../../../util/formatCurrency'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { useErrorToast } from '../../shared/toast'
import AppDivider from '../../shared/AppDivider'
import DeleteAlertDialog from '../../shared/DeleteAlertDialog'


const Product = ({ product }) => {
    const { image, name, price, description } = product
    const { url: imageUrl } = image
    return (
        <Flex direction='row' p={2} height='100%'>
            <Box display='flex' alignItems='center'>
                <Image borderRadius={10} objectFit='cover' boxSize={75} src={imageUrl}></Image>
            </Box>
            <Box ml={4}>
                <Text fontSize='lg' fontWeight={600}>{name}</Text>
                <Text fontSize='md'>{formatCurrency(price)}</Text>
                <Text fontSize='sm'>{description}</Text>
            </Box>
            <Box ml='auto' alignSelf='center'>
                <IconButton
                    isRound
                    variant='ghost'
                    _focus={{ boxShadow: 'none' }}
                    icon={<Icon as={MdLaunch} boxSize={25} />}
                />
            </Box>
        </Flex >)
}


const Menu = ({ menu }) => {
    const { id, name, products } = menu
    return (
        <Box p={2}>
            <Flex justify='space-between'>
                <Text fontSize='2xl' fontWeight={600}>{name} ({menu.products.length})</Text>
                <Box ml='auto'>
                    <Link to={`/dashboard/menus/${id}/add-product`}>
                        <IconButton
                            isRound
                            variant='ghost'
                            _focus={{ boxShadow: 'none' }}
                            icon={<Icon as={AddIcon} boxSize={15} />}
                        />
                    </Link>
                </Box>
            </Flex>
            <Box>
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </Box >
        </Box>
    )
}

const MenuNameList = ({ storeId, subMenus, onMenuAdded }) => {
    const { value: menuInput, onInput: onMenuInput, reset: resetMenuInput } = useInput('')
    const [menuSubmitting, setMenuSubmitting] = useState(false)
    const errorToast = useErrorToast()

    async function addMenu(e) {
        e.preventDefault()
        setMenuSubmitting(true)
        try {
            const { data: addedMenu } = await api.post(`/stores/${storeId}/sub-menus`, { name: menuInput })
            onMenuAdded()
        } catch (e) {
            const message =
                e.response.data.statusCode === 500 ?
                    'Please provide a unique name' :
                    e.response.data.message[0]
            errorToast({ title: 'Add menu failed', description: message })
        } finally {
            resetMenuInput()
            setMenuSubmitting(false)
        }
    }

    return (
        <Box p={2}>
            <Flex justify='space-between'>
                <Text fontSize='2xl' fontWeight={600}>Menu</Text>
                <Box ml='auto'>
                    <form onSubmit={addMenu}>
                        <Input value={menuInput} onInput={onMenuInput} w={200} placeholder='Menu name' mr={2} required />
                        <Button isLoading={menuSubmitting} type='submit' colorScheme='yellow'>Add menu</Button>
                    </form>
                </Box>
            </Flex>
            {subMenus.map(menu =>
                <Link><Text py={2} fontSize='md'>{menu.name} ({menu.products.length})</Text></Link>
            )}
        </Box>)
}

export default function StoreDetailDashboard() {
    const { id } = useParams()
    const history = useHistory()
    const { data, error, loading, setData, refresh, setLoading } = useApiGet({ endpoint: `/stores/${id}`, defaultValue: null })
    const errorToast = useErrorToast()
    const [deleteStoreAlertOpen, setDeleteStoreAlertOpen] = useBoolean()
    const [deletingStore, setDeletingStore] = useState(false)
    const cancelRef = useRef()
    const { name, address, description, image, subMenus = [] } = data || {}
    const { url: imageUrl } = image || {}

    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])

    async function deleteStore() {
        setDeleteStoreAlertOpen.off()
        setDeletingStore(true)
        try {
            await api.delete(`/stores/${id}`)
            history.push('/dashboard/stores')
        }
        catch (e) {
            errorToast({ title: 'Delete store failed!' })
        } finally {
            setDeletingStore(false)
        }
    }

    return (
        <Flex direction='column' p={5}>
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
                            <GridItem colSpan={[12, null, 9]}>
                                <Box p={4}>
                                    <Flex>
                                        <Text fontSize='3xl' fontWeight={600}>{name}</Text>
                                    </Flex>
                                    <Text fontSize='xl'>{address}</Text>
                                    <Text fontSize='md'>{description}</Text>
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, null, 1]}>
                                <Box p={4}>
                                    <Button isLoading={deletingStore} onClick={setDeleteStoreAlertOpen.on} leftIcon={<Icon as={DeleteIcon} />} colorScheme='red'>Delete</Button>
                                </Box>
                            </GridItem>
                        </SimpleGrid>
                        <AppDivider />
                        <SimpleGrid columns={12} w='100%'>
                            <GridItem colSpan={[12, null, 4, null]}>
                                <MenuNameList storeId={id} subMenus={subMenus} onMenuAdded={refresh} />
                            </GridItem>
                            <GridItem colSpan={[12, null, 8, null]}>
                                {subMenus.map(menu => <Menu key={menu.id} menu={menu} />)}
                            </GridItem>
                        </SimpleGrid>

                        {/* Alert dialogs*/}
                        <DeleteAlertDialog
                            isOpen={deleteStoreAlertOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={setDeleteStoreAlertOpen.off}
                            header={`Delete ${name}?`}
                            onDeleteClick={deleteStore}
                        />
                    </Fragment>
                )
            }
        </Flex >
    )
}