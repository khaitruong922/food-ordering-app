import { Box, Button, Flex, FormControl, FormLabel, Icon, Input, Table, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useInput from '../../hook/useInput';
import useAuthStore from '../../store/useAuthStore';
import useCartsStore from '../../store/useCartsStore';
import formatCurrency from '../../util/formatCurrency';
import getArrayEntries from '../../util/getArrayEntries';
import {HiCheckCircle} from 'react-icons/hi'


function Info({ label, value }) {
    return (
        <Flex py={0.5}>
            <Text fontWeight={600}>{label}</Text>
            <Box ml='auto'>
                <Text>{value}</Text>
            </Box>
        </Flex>)
}

export default function CheckoutPage() {
    const { id: storeId } = useParams()
    const { nextStep, prevStep, activeStep, setStep } = useSteps({
        initialStep: 0,
    })
    const [submitting, setSubmitting] = useState(false)
    const user = useAuthStore(state => state.user)
    const { value: name, onInput: onNameInput } = useInput(user ? user.name : '')
    const { value: phoneNumber, onInput: onPhoneNumberInput } = useInput(user ? user.phoneNumber : '')
    const { value: address, onInput: onAddressInput } = useInput(user ? user.address : '')
    const { value: note, onInput: onNoteInput } = useInput('')
    const cart = useCartsStore(state => state.carts[storeId])
    const products = getArrayEntries(cart.products)
    const { total } = cart
    const submitOrder = useCartsStore(state => state.submitOrder)
    const toast = useToast()
    async function handleOrderSubmit(e) {
        e.preventDefault()
        if (submitting) return
        setSubmitting(true)
        try {
            const data = await submitOrder({ storeId, address, note, name, phoneNumber })
            if (data) {
                nextStep()
            }
        } catch (e) {
            toast({
                position: 'bottom-right',
                title: 'Order failed!',
                description: 'Something wrong happened!',
                status: 'error',
                isClosable: true,
            })
        } finally {
            setSubmitting(false)
        }
    }
    const steps = [
        {
            label: "Shipping Information",
            item: <ShippingInformation />
        },
        {
            label: "Review",
            item: <Review />
        },
        {
            label: "Completed",
            item: <Completed />
        }
    ]
    function ShippingInformation() {
        return (
            <Box>
                <Box>
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input value={name} onInput={onNameInput} required />
                    </FormControl>
                    <FormControl id="phoneNumber">
                        <FormLabel>Phone number</FormLabel>
                        <Input value={phoneNumber} onInput={onPhoneNumberInput} required />
                    </FormControl>
                    <FormControl id="address">
                        <FormLabel>Address</FormLabel>
                        <Input value={address} onInput={onAddressInput} required />
                    </FormControl>
                    <FormControl id="note">
                        <FormLabel>Note</FormLabel>
                        <Textarea resize='none' noOfLines={3} value={note} onInput={onNoteInput} />
                    </FormControl>
                </Box>
                <Box height={5} />
                <Flex justify='flex-end'>
                    <Link to={`/stores/${storeId}`}><Button>Back to store</Button></Link>
                    <Button colorScheme='teal' ml={2} onClick={nextStep}>Next</Button>
                </Flex>
            </Box>)
    }
    function Review() {
        return (<Box>
            <Info label='Name' value={name} />
            <Info label='Address' value={address} />
            <Info label='Phone number' value={phoneNumber} />
            <Info label='Note' />
            <Text>{note}</Text>
            <Box height={10} />
            <Table variant='simple'>
                <Thead>
                    <Th>Item</Th>
                    <Th>Quantity</Th>
                    <Th>Subtotal</Th>
                </Thead>
                <Tbody>
                    {products.map(({ data: { id, name, price }, quantity }) => (
                        <Tr key={id}>
                            <Td>{name}</Td>
                            <Td>{quantity}</Td>
                            <Td>{formatCurrency(quantity * price)}</Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th fontSize='md' colSpan={2}>Total</Th>
                        <Th fontSize='md' align='right'>{formatCurrency(total)}</Th>
                    </Tr>
                </Tfoot>
            </Table>
            <Box height={20} />
            <Flex justify='flex-end'>
                <Button onClick={prevStep}>Back</Button>
                <Button colorScheme='teal' ml={2} isLoading={submitting} onClick={handleOrderSubmit}>Confirm order</Button>
            </Flex>
        </Box>
        )
    }
    function Completed() {
        return (<Flex flexDirection='column' alignItems='center'>
            <Text fontSize='2xl' color='teal.400' >
                Your order has been placed!
            </Text>
            <Box height={5} />
            <Icon as={HiCheckCircle} boxSize={50} color='green.500' />
        </Flex>)
    }

    return (
        <Box width='50%' minWidth={500} display='flex' mx='auto' flexDirection='column' alignItems='center' py={5}>
            <Box mb={5}>
                <Text fontSize='3xl' align='center'>
                    Checkout
                </Text>
            </Box>
            <Box width='100%'>
                <Steps colorScheme='teal' activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step label={step.label} key={step.label}>
                            <Flex direction='column' justify='center' boxShadow='md' mt={10} py={5} px={10}>
                                <form onSubmit={handleOrderSubmit}>
                                    {step.item}
                                </form>
                            </Flex>
                        </Step>
                    ))}
                </Steps>
            </Box>
        </Box>
    )
}

