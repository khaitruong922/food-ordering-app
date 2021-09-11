import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, GridItem, Icon, IconButton, Image, Input, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Helmet } from "react-helmet-async"
import { Link, useHistory, useParams } from "react-router-dom"
import api from '../../../api/api'
import useApiGet from '../../../hook/useApiGet'
import useInput from '../../../hook/useInput'
import formatCurrency from '../../../util/formatCurrency'
import AppDivider from '../../shared/AppDivider'
import DeleteAlertDialog from '../../shared/DeleteAlertDialog'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { useErrorToast, useSuccessToast } from '../../shared/toast'
import AddProductModal from './AddProductModal'
import EditProductModal from './EditProductModal'
import EditStoreModal from './EditStoreModal'


const Product = ({ product, refresh }) => {
    const { id, image, name, price, description } = product
    const { url: imageUrl } = image || {}
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const [deleting, setDeleting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const cancelRef = useRef()
    async function deleteProduct() {
        setDeleting(true)
        try {
            await api.delete(`/products/${id}`)
            successToast({ title: 'Delete product successfully!' })
            refresh()
        } catch (e) {
            errorToast({ title: 'Delete product failed' })
        } finally {
            setDeleting(false)
        }
    }
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
                    colorScheme='yellow'
                    onClick={onEditOpen}
                    _focus={{ boxShadow: 'none' }}
                    icon={<Icon as={EditIcon} />}
                />
                <EditProductModal product={product} isOpen={isEditOpen} onClose={onEditClose} refresh={refresh} />
                <IconButton
                    isRound
                    onClick={onDeleteOpen}
                    variant='ghost'
                    _focus={{ boxShadow: 'none' }}
                    colorScheme='red'
                    icon={<DeleteIcon />}
                />
                <DeleteAlertDialog
                    isOpen={isDeleteOpen}
                    isLoading={deleting}
                    leastDestructiveRef={cancelRef}
                    onClose={onDeleteClose}
                    header={`Delete ${name}?`}
                    onDeleteClick={deleteProduct}
                />
            </Box>
        </Flex >)
}


const Menu = ({ menu, refresh }) => {
    const { id, name, products } = menu
    const { isOpen: isAddProductOpen, onOpen: onAddProductOpen, onClose: onAddProductClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const [deleting, setDeleting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const cancelRef = useRef()
    async function deleteMenu() {
        setDeleting(true)
        try {
            await api.delete(`/sub-menus/${id}`)
            successToast({ title: 'Delete menu successfully!' })
            refresh()
        } catch (e) {
            errorToast({ title: 'Delete menu failed' })
        } finally {
            setDeleting(false)
        }
    }
    return (
        <Box p={2}>
            <Flex justify='space-between'>
                <Text fontSize='2xl' fontWeight={600}>{name} ({menu.products.length})</Text>
                <Box ml='auto'>
                    <IconButton
                        onClick={onAddProductOpen}
                        isRound
                        variant='ghost'
                        colorScheme='green'
                        _focus={{ boxShadow: 'none' }}
                        icon={<Icon as={AddIcon} boxSize={15} />}
                    />
                    <AddProductModal menu={menu} isOpen={isAddProductOpen} onClose={onAddProductClose} refresh={refresh} />
                    <IconButton
                        isRound
                        variant='ghost'
                        colorScheme='red'
                        onClick={onDeleteOpen}
                        _focus={{ boxShadow: 'none' }}
                        icon={<Icon as={DeleteIcon} boxSize={15} />}
                    />
                    <DeleteAlertDialog
                        isOpen={isDeleteOpen}
                        isLoading={deleting}
                        leastDestructiveRef={cancelRef}
                        onClose={onDeleteClose}
                        header={`Delete ${name}?`}
                        onDeleteClick={deleteMenu}
                    />
                </Box>
            </Flex>
            <Box>
                {products.map(product => (
                    <Product refresh={refresh} key={product.id} product={product} />
                ))}
            </Box >
        </Box>
    )
}

const MenuNameList = ({ storeId, subMenus, refresh }) => {
    const { value: menuInput, onInput: onMenuInput, reset: resetMenuInput } = useInput('')
    const [menuSubmitting, setMenuSubmitting] = useState(false)
    const errorToast = useErrorToast()

    async function addMenu(e) {
        e.preventDefault()
        setMenuSubmitting(true)
        try {
            const { data: addedMenu } = await api.post(`/stores/${storeId}/sub-menus`, { name: menuInput })
            refresh()
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
            <Flex justify='space-between' align='center'>
                <Text fontSize='2xl' fontWeight={600}>Menu</Text>
                <form onSubmit={addMenu}>
                    <Flex align='center'>
                        <Input size='sm' value={menuInput} onInput={onMenuInput} w={200} placeholder='Menu name' mr={2} required />
                        <Button size='sm' isLoading={menuSubmitting} type='submit' colorScheme='yellow'>Add menu</Button>
                    </Flex>
                </form>
            </Flex>
            {subMenus.map(menu =>
                <Link><Text py={2} fontSize='md'>{menu.name} ({menu.products.length})</Text></Link>
            )}
        </Box>)
}

export default function StoreDetailDashboard() {
    const { id } = useParams()
    const history = useHistory()
    const { data: store, error, loading, setData, refresh, setLoading } = useApiGet({ endpoint: `/stores/${id}`, defaultValue: null })
    const errorToast = useErrorToast()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()

    const [deletingStore, setDeletingStore] = useState(false)
    const cancelRef = useRef()
    const { name, address, description, image, subMenus = [] } = store || {}
    const { url: imageUrl } = image || {}

    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])

    async function deleteStore() {
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
                                <Flex p={4}>
                                    <Button size='sm' mr={2} onClick={onEditOpen} leftIcon={<Icon as={EditIcon} />} colorScheme='yellow'>Edit</Button>
                                    <EditStoreModal refresh={refresh} store={store} isOpen={isEditOpen} onClose={onEditClose} />
                                    <Button size='sm' onClick={onDeleteOpen} leftIcon={<Icon as={DeleteIcon} />} colorScheme='red'>Delete</Button>
                                    {/* Alert dialogs*/}
                                    <DeleteAlertDialog
                                        isOpen={isDeleteOpen}
                                        isLoading={deletingStore}
                                        leastDestructiveRef={cancelRef}
                                        onClose={onDeleteClose}
                                        header={`Delete ${name}?`}
                                        onDeleteClick={deleteStore}
                                    />
                                </Flex>
                            </GridItem>
                            <GridItem colSpan={[12, null, 1]}>

                            </GridItem>
                        </SimpleGrid>
                        <AppDivider />
                        <SimpleGrid columns={12} w='100%'>
                            <GridItem colSpan={[12, null, 4, null]}>
                                <MenuNameList storeId={id} subMenus={subMenus} refresh={refresh} />
                            </GridItem>
                            <GridItem colSpan={[12, null, 8, null]}>
                                {subMenus.map(menu => <Menu refresh={refresh} key={menu.id} menu={menu} />)}
                            </GridItem>
                        </SimpleGrid>
                    </Fragment>
                )
            }
        </Flex >
    )
}