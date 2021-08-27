import { CheckIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, GridItem, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Tab, Table, TabList, Tabs, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React, { useState } from 'react';
import { BiTimeFive } from "react-icons/bi";
import api from "../../../api/api";
import useApiGet from "../../../hook/useApiGet";
import formatCurrency from '../../../util/formatCurrency';
import LoadingSpinner from "../../shared/LoadingSpinner";
import { FaMotorcycle, FaClipboardCheck } from 'react-icons/fa'
import { GiCookingPot } from 'react-icons/gi'

const orderStatuses = [
    { name: 'PENDING', icon: <Icon as={BiTimeFive} color='yellow.600' /> },
    { name: 'RECEIVED', icon: <Icon as={FaClipboardCheck} color='yellow.600' /> },
    { name: 'PREPARING', icon: <Icon as={GiCookingPot} color='yellow.600' /> },
    { name: 'DELIVERING', icon: <Icon as={FaMotorcycle} color='yellow.600' /> },
    { name: 'COMPLETED', icon: <Icon as={CheckIcon} color='green.400' /> },
]

function Info({ label, value }) {
    return (
        <Flex py={0.5}>
            <Text fontWeight={600}>{label}</Text>
            <Box ml='auto'>
                <Text>{value}</Text>
            </Box>
        </Flex>)
}

function Order({ order, onStatusChange }) {
    const { id, name, address, phoneNumber, note, createdAt, status, orderDetails, totalPrice, user } = order
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [changingStatus, setChangingStatus] = useState('')
    const isCompleted = status === 'COMPLETED'
    const icon = orderStatuses.find(s => s.name === status)?.icon
    async function changeOrderStatus(status) {
        setChangingStatus(status)
        try {
            await api.patch(`/orders/${id}`, { status })
            onStatusChange()
        } catch (e) {

        } finally {
            setChangingStatus('')
        }
    }

    return (
        <Box border='1px' borderColor={isCompleted ? 'green.400' : 'yellow.400'} onClick={onOpen} cursor='pointer' boxShadow='sm' borderRadius='md' p={4}>
            <Flex>
                <Text fontSize='lg' fontWeight={600}>#{id}</Text>
                <Avatar ml='auto' boxSize={25} src={user?.avatar?.url} />
            </Flex>
            <Text color='gray.600' fontSize='sm'>{new Date(createdAt).toISOString().substring(0, 10)}</Text>
            <Flex my={1} align='center'>
                {icon}
                <Text color={isCompleted ? 'green.400' : 'yellow.600'} textTransform='capitalize' fontSize='sm' ml={2}>{status.toLowerCase()}</Text>
            </Flex>
            <Text fontWeight={600} align='right'>{formatCurrency(totalPrice)}</Text>
            <Modal size='3xl' preserveScrollBarGap closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalHeader>
                        <Text fontSize='xl' fontWeight={600}>Order #{id}</Text>
                        <Text color='gray.600' fontSize='md'>{new Date(createdAt).toISOString().substring(0, 10)}</Text>
                        <Flex my={4} align='center'>
                            {isCompleted ?
                                <Flex align='center'>
                                    <Icon boxSize={15} as={CheckIcon} color='green.400' mr={2} />
                                    <Text fontSize='md' color='green.400'>Completed</Text>
                                </Flex> :
                                orderStatuses.map(({ name, icon }) => (
                                    <Button
                                        isDisabled={status === name}
                                        isLoading={changingStatus === name}
                                        colorScheme={status === name ? 'yellow' : 'gray'}
                                        key={name} onClick={() => changeOrderStatus(name)}
                                        size='sm' mx={1} borderRadius='lg' leftIcon={icon}
                                        textTransform='capitalize' fontSize='md'>
                                        {name.toLowerCase()}
                                    </Button>
                                ))
                            }
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Info label='User ID' value={user?.id} />
                        <Info label='Username' value={user?.username} />
                        <Box h={5} />
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
                                        <Td isNumeric>{formatCurrency(quantity * price)}</Td>
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

export default function OrderDashboard() {
    const [status, setStatus] = useState(orderStatuses[0].name)
    const { data: orders, loading, refresh } = useApiGet({ endpoint: '/orders/all', defaultValue: [] })
    const isCompleted = status === 'COMPLETED'
    const displayedOrders = orders.filter(order => order.status === status)
    function handleTabChange(index) {
        setStatus(orderStatuses[index].name)
    }
    return (
        <Box p={5}>
            <Text fontWeight={700} fontSize='2xl' textTransform='uppercase'>Orders</Text>
            <Tabs my={4} onChange={handleTabChange} colorScheme={isCompleted ? 'green' : 'yellow'} size="md">
                <TabList>
                    {orderStatuses.map(status =>
                        <Tab key={status.name} _focus={{ boxShadow: 'none' }}>
                            <Flex align='center'>
                                {status.icon}
                                <Text ml={2} textTransform='capitalize'>{status.name.toLowerCase()}</Text>
                            </Flex>
                        </Tab>)
                    }

                </TabList>
            </Tabs>
            {loading ? <LoadingSpinner /> :
                <SimpleGrid columns={12} spacing={3}>
                    {displayedOrders.map(order =>
                        <GridItem key={order.id} colSpan={[12, 6, 4, 3]}>
                            <Order order={order} onStatusChange={refresh} />
                        </GridItem>
                    )}
                </SimpleGrid>
            }

        </Box >

    )
}