import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import api from '../../../api/api';
import useApiGet from "../../../hook/useApiGet";
import DeleteAlertDialog from '../../shared/DeleteAlertDialog';
import LoadingSpinner from "../../shared/LoadingSpinner";
import { useErrorToast, useSuccessToast } from '../../shared/toast';
import EditUserModal from './EditUserModal';

function UserRow({ user, refresh }) {
    const { id, name, username, address, phoneNumber, email } = user
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const [deleting, setDeleting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    const cancelRef = useRef()

    async function deleteUser() {
        setDeleting(true)
        try {
            await api.delete(`/users/${id}`)
            successToast({ title: 'Delete user successfully!' })
            refresh()
        } catch (e) {
            errorToast({ title: 'Delete user failed' })
        } finally {
            setDeleting(false)
        }
    }

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{username}</Td>
            <Td>{address}</Td>
            <Td>{phoneNumber}</Td>
            <Td>{email}</Td>
            <Td textAlign='center'>
                <IconButton
                    isRound
                    variant='ghost'
                    colorScheme='yellow'
                    onClick={onEditOpen}
                    _focus={{ boxShadow: 'none' }}
                    icon={<Icon as={EditIcon} />}
                />
                <EditUserModal user={user} isOpen={isEditOpen} onClose={onEditClose} refresh={refresh} />
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
                    header={`Delete user ${id}?`}
                    onDeleteClick={deleteUser}
                />
            </Td>
        </Tr>
    )
}

export default function UserDashboard() {
    const { data: users, loading, error, refresh } = useApiGet({ endpoint: '/users', defaultValue: [] })

    return (
        <Flex direction='column' p={5}>
            <Text fontWeight={700} fontSize='2xl' textTransform='uppercase' mb={2}>Users</Text>
            {
                loading ?
                    <LoadingSpinner /> :
                    <Table variant='striped' colorScheme='gray' size='sm'>
                        <Thead>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Username</Th>
                            <Th>Address</Th>
                            <Th>Phone number</Th>
                            <Th>Email</Th>
                            <Th textAlign='center'>Manage</Th>
                        </Thead>
                        <Tbody>
                            {users.map(user => <UserRow user={user} refresh={refresh} key={user.id} />)}
                        </Tbody>
                    </Table>
            }
        </Flex>
    )
}