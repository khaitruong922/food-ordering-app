import { CheckIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, GridItem, Icon, Modal, ModalOverlay, SimpleGrid, Tab, TabList, Tabs, Text, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Table, Thead, Tbody, Th, Tr, Td, Tfoot, FormControl, FormLabel, Input, useBoolean } from '@chakra-ui/react'
import { useState } from 'react'
import { Fragment } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { IoLocationOutline } from 'react-icons/io5'
import api from '../../api/api'
import useApiGet from '../../hook/useApiGet'
import useInput from '../../hook/useInput'
import useAuthStore from '../../store/useAuthStore'
import formatCurrency from '../../util/formatCurrency'
import LoadingSpinner from '../shared/LoadingSpinner'
import { useErrorToast, useSuccessToast } from '../shared/toast'

function UserEditForm({ onCancel }) {
    const user = useAuthStore(state => state.user)
    const { value: name, onInput: onNameInput } = useInput(user.name)
    const { value: email, onInput: onEmailInput } = useInput(user.email)
    const { value: phoneNumber, onInput: onPhoneNumberInput } = useInput(user.phoneNumber)
    const { value: address, onInput: onAddressInput } = useInput(user.address)
    const [submitting, setSubmitting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
    const onFormSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await api.patch('/users/me', { name, email, phoneNumber, address })
            await fetchCurrentUser()
            successToast({
                title: 'Update info successfully!',
            })
            onCancel()
        }
        catch (e) {
            const message = e.response.data.message[0]
            errorToast({
                title: 'Update info failed!',
                description: message,
            })
        }
        finally {
            setSubmitting(false)
        }
    }
    return (
        <Box w='100%'>
            <form onSubmit={onFormSubmit}>
                <FormControl id="name" mb={5}>
                    <FormLabel>Name</FormLabel>
                    <Input size='sm' value={name} onInput={onNameInput} required />
                </FormControl>
                <FormControl id="phoneNumber">
                    <Flex my={1} align='center'>
                        <Icon as={PhoneIcon} mr={2} />
                        <Input size='sm' placeholder='Phone number' type='tel' value={phoneNumber} onInput={onPhoneNumberInput} required />
                    </Flex>
                </FormControl>
                <FormControl id="email">
                    <Flex my={1} align='center'>
                        <Icon as={EmailIcon} mr={2} />
                        <Input size='sm' placeholder='Email' type='email' value={email} onInput={onEmailInput} required />
                    </Flex>
                </FormControl>
                <FormControl id="address">
                    <Flex my={1} align='center'>
                        <Icon as={IoLocationOutline} mr={2} />
                        <Input size='sm' placeholder='Address' value={address} onInput={onAddressInput} required />
                    </Flex>
                </FormControl>
                <Box height={5}></Box>
                <Flex align='center'>
                    <Button size='sm' type="submit" colorScheme='yellow' mr={1} isLoading={submitting}>Save</Button>
                    <Button size='sm' type='button' onClick={onCancel} disabled={submitting}>Cancel</Button>
                </Flex>
            </form>
        </Box>
    )
}

function UserInfo() {
    const user = useAuthStore(state => state.user)
    const { id, name, phoneNumber, address, username, email, avatar } = user
    const { url: avatarUrl } = avatar || {}
    const [editMode, setEditMode] = useBoolean()

    return (
        <Flex direction="column" alignItems='flex-start' p={2}>
            <Avatar alignSelf='center' src={avatarUrl} size='3xl' mb={6}>
            </Avatar>
            {editMode ? <UserEditForm onCancel={setEditMode.off} />
                : (<Fragment>
                    <Text fontSize='2xl' fontWeight={600}>{name}</Text>
                    <Text fontSize='md' mb={2}>{username}</Text>
                    <Flex my={1} align='center'>
                        <Icon as={PhoneIcon} mr={2} />
                        <Text>{phoneNumber}</Text>
                    </Flex>
                    <Flex my={1} align='center'>
                        <Icon as={EmailIcon} mr={2} />
                        <Text>{email}</Text>
                    </Flex>
                    <Flex my={1} align='center'>
                        <Icon as={IoLocationOutline} mr={2} />
                        <Text>{address}</Text>
                    </Flex>
                    <Button onClick={setEditMode.on} mt={2} variant='outline' alignSelf='center' w='100%' colorScheme='yellow' size='sm'>Edit profile</Button>
                </Fragment>
                )
            }

        </Flex>
    )
}


function Info({ label, value }) {
    return (
        <Flex py={0.5}>
            <Text fontWeight={600}>{label}</Text>
            <Box ml='auto'>
                <Text>{value}</Text>
            </Box>
        </Flex>)
}


function Order({ order }) {
    const { id, name, address, phoneNumber, note, createdAt, status, orderDetails, totalPrice, store } = order
    const { name: storeName } = store || {}
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isCompleted = status === 'COMPLETED'
    return (
        <Box border='1px' borderColor={isCompleted ? 'green.400' : 'yellow.400'} onClick={onOpen} cursor='pointer' boxShadow='sm' borderRadius='md' p={4}>
            <Text fontSize='lg' fontWeight={600}>Order #{id}</Text>
            <Text color='gray.600' fontSize='sm'>{new Date(createdAt).toISOString().substring(0, 10)}</Text>
            <Flex my={1} align='center'>
                {isCompleted ?
                    <Icon color='green.400' as={CheckIcon} mr={2} /> :
                    <Icon color='yellow.600' as={BiTimeFive} mr={2} />
                }
                <Text
                    color={isCompleted ? 'green.400' : 'yellow.600'}
                    textTransform='capitalize' fontSize='sm'
                >
                    {status.toLowerCase()}
                </Text>
            </Flex>
            <Text fontWeight={600} align='right'>{formatCurrency(totalPrice)}</Text>
            <Modal size='3xl' preserveScrollBarGap closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalHeader>
                        <Text fontSize='xl' fontWeight={600}>Order #{id}</Text>
                        <Text color='gray.600' fontSize='md'>{new Date(createdAt).toISOString().substring(0, 10)}</Text>
                        <Flex my={1} align='center'>
                            {isCompleted ?
                                <Icon color='green.400' as={CheckIcon} mr={2} /> :
                                <Icon color='yellow.600' as={BiTimeFive} mr={2} />
                            }
                            <Text
                                color={isCompleted ? 'green.400' : 'yellow.600'}
                                textTransform='capitalize' fontSize='md'
                            >
                                {status.toLowerCase()}
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Info label='Store' value={storeName} />
                        <Box height={5} />
                        <Info label='Name' value={name} />
                        <Info label='Address' value={address} />
                        <Info label='Phone number' value={phoneNumber} />
                        <Info label='Note' />
                        <Text>{note}</Text>
                        <Box height={10} />
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Item</Th>
                                    <Th isNumeric>Quantity</Th>
                                    <Th isNumeric>Subtotal</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orderDetails.map(({ product, id, quantity, price }) => (
                                    <Tr key={id}>
                                        <Td>{product?.name}</Td>
                                        <Td isNumeric>{quantity}</Td>
                                        <Td isNumeric>{formatCurrency(price)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th fontSize='md' colSpan={2}>Total</Th>
                                    <Th fontSize='md' isNumeric>{formatCurrency(totalPrice)}</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

function OrderList() {
    const [tabIndex, setTabIndex] = useState(0)
    const { data: orders, loading } = useApiGet({ endpoint: '/orders', defaultValue: [] })
    const isCompleted = tabIndex === 1
    const displayedOrders = isCompleted ?
        orders.filter(order => order.status === 'COMPLETED')
        : orders.filter(order => order.status !== 'COMPLETED')

    return (
        <Box p={4}>
            <Text fontWeight={700} fontSize='2xl' textTransform='uppercase'>Order history</Text>
            <Tabs my={4} onChange={(index) => setTabIndex(index)} colorScheme={isCompleted ? 'green' : 'yellow'} size="md">
                <TabList>
                    <Tab _focus={{ boxShadow: 'none' }}>
                        <Flex align='center'>
                            <Icon as={BiTimeFive} mr={2} />
                            <Text>In progress</Text>
                        </Flex>
                    </Tab>
                    <Tab _focus={{ boxShadow: 'none' }}>
                        <Flex align='center'>
                            <Icon as={CheckIcon} mr={2} />
                            <Text>Completed</Text>
                        </Flex>
                    </Tab>
                </TabList>
            </Tabs>
            {loading ? <LoadingSpinner /> :
                <SimpleGrid columns={12} spacing={3}>
                    {displayedOrders.map(order =>
                        <GridItem key={order.id} colSpan={[12, 6, 4, 3]}>
                            <Order order={order} />
                        </GridItem>
                    )}
                </SimpleGrid>
            }
        </Box >

    )
}

export default function ProfilePage() {
    return (
        <Flex h='100%' direction='column' p={4}>
            <SimpleGrid columns={12} spacing={3}>
                <GridItem colSpan={[12, null, 1, 2]}>
                </GridItem>
                <GridItem colSpan={[12, null, 3, 2]}>
                    <UserInfo />
                </GridItem>
                <GridItem colSpan={[12, null, 7, 6]}>
                    <OrderList />
                </GridItem>
                <GridItem colSpan={[12, null, 1, 2]}>
                </GridItem>
            </SimpleGrid>
        </Flex>
    )
}
