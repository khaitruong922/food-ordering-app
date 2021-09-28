import { Box, Button, Flex, FormControl, FormLabel, GridItem, Icon, Image, Input, SimpleGrid, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useApiGet from '../../hook/useApiGet';
import useInput from '../../hook/useInput';
import useAuthStore from '../../store/useAuthStore';
import useCartsStore from '../../store/useCartsStore';
import formatCurrency from '../../util/formatCurrency';
import getArrayEntries from '../../util/getArrayEntries';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useErrorToast } from '../shared/toast';


export default function Checkout() {
    const { id: storeId } = useParams()
    const { data: store, loading: storeLoading } = useApiGet({ endpoint: `/stores/${storeId}`, defaultValue: null })
    const { name: storeName, address: storeAddress } = store || {}
    const user = useAuthStore(state => state.user)
    const { value: name, onInput: onNameInput } = useInput(user ? user.name : '')
    const { value: phoneNumber, onInput: onPhoneNumberInput } = useInput(user ? user.phoneNumber : '')
    const { value: address, onInput: onAddressInput } = useInput(user ? user.address : '')
    const { value: note, onInput: onNoteInput } = useInput('')
    const [submitting, setSubmitting] = useState(false)
    const submitOrder = useCartsStore(s => s.submitOrder)
    const cart = useCartsStore(s => s.carts[storeId])
    const { total } = cart
    const products = getArrayEntries(cart.products)
    const errorToast = useErrorToast()
    const [orderPlaced, setOrderPlaced] = useState(false)

    async function handleOrderSubmit(e) {
        e.preventDefault()
        if (submitting) return
        setSubmitting(true)
        try {
            await submitOrder({ storeId: Number(storeId), address, note, name, phoneNumber })
            setOrderPlaced(true)
        } catch (e) {
            errorToast({
                title: 'Order failed!',
                description: 'Something wrong happened!',
            })
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Box p={5}>

            {
                orderPlaced ? <OrderPlaced /> :
                    <>
                        <Box>
                            <Text align='center' fontSize='3xl' fontWeight={600}>Checkout</Text>
                        </Box>
                        <SimpleGrid columns={12} spacing={5} mt={5}>
                            <GridItem colSpan={[12, null, 1, 2]}>
                            </GridItem>
                            <GridItem colSpan={[12, null, 5, 4]}>
                                {storeLoading ? <LoadingSpinner /> :
                                    <Box p={5} boxShadow='md'>
                                        <Box mb={2}>
                                            <Text fontSize='2xl' fontWeight={600} mb={2}>Store</Text>
                                            <Text>{storeName} - {storeAddress}</Text>
                                        </Box>

                                        <Text fontSize='2xl' fontWeight={600} mb={4}>My cart</Text>
                                        {products.map((product => ( // 'length' depend on data
                                            <Product product={product} key={product.id} />
                                        )))
                                        }
                                        <Flex mt={3}>
                                            <Text fontSize='xl' fontWeight={600}>Total</Text>
                                            <Text ml='auto' fontSize='xl' fontWeight={600}>{formatCurrency(total)}</Text>
                                        </Flex>
                                    </Box>
                                }
                            </GridItem>
                            <GridItem colSpan={[12, null, 5, 4]}>
                                <Box p={5} boxShadow='md'>
                                    <Text fontSize='2xl' fontWeight={600}>Delivery information</Text>
                                    <Box mt={5}>
                                        <form onSubmit={handleOrderSubmit}>
                                            <FormControl id="name" mb={2}>
                                                <FormLabel>Name</FormLabel>
                                                <Input value={name} onInput={onNameInput} required />
                                            </FormControl>
                                            <FormControl id="phoneNumber" mb={2}>
                                                <FormLabel>Phone Number</FormLabel>
                                                <Input type='tel' value={phoneNumber} onInput={onPhoneNumberInput} required />
                                            </FormControl>
                                            <FormControl id="address" mb={2}>
                                                <FormLabel>Address</FormLabel>
                                                <Input value={address} onInput={onAddressInput} required />
                                            </FormControl>
                                            <FormControl id="note" mb={2}>
                                                <FormLabel>Note</FormLabel>
                                                <Textarea noOfLines={3} value={note} onInput={onNoteInput} />
                                            </FormControl>
                                            <Flex justify='right' align='center'>
                                                <Link to={`/stores/${storeId}`}><Button type='button'>Back to store</Button></Link>
                                                <Button ml={2} isLoading={submitting} type='submit' colorScheme='yellow'>Order</Button>
                                            </Flex>
                                        </form>
                                    </Box>
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, null, 1, 2]}>
                            </GridItem>
                        </SimpleGrid>
                    </>
            }
        </Box >

    )
}
function Product({ product }) {
    const { quantity, data } = product
    const { id, name, price, image } = data || {}
    const { url: imageUrl } = image || {}
    return (
        <Flex align='center' mb={2}>
            <Image mr={2} borderRadius='full' h={45} w={45} src={imageUrl} />
            <Flex>
                <Text fontWeight={600}>{name}</Text>
                <Text ml={2}>x{quantity}</Text>
            </Flex>
            <Box ml='auto'>
                <Text fontWeight={600}>{formatCurrency(quantity * price)}</Text>
            </Box>
        </Flex>
    )
}

function OrderPlaced() {
    return (
        <Flex direction='column' align='center' jusitfy='center'>
            <Text color='teal.400' fontSize='3xl' fontWeight={600}>Your order has been placed!</Text>
            <Icon my={2} as={FiCheckCircle} color='teal.400' boxSize={50} />
        </Flex>
    )

}