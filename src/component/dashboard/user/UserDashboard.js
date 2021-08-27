import { Flex, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { MdLaunch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useApiGet from "../../../hook/useApiGet";
import LoadingSpinner from "../../shared/LoadingSpinner";


export default function UserDashboard() {
    const { data: users, loading, error, refresh } = useApiGet({ endpoint: '/users', defaultValue: [] })

    return (
        <Flex direction='column' p={5}>
            <Text fontWeight={700} fontSize='2xl' textTransform='uppercase' mb={2}>Users</Text>
            {
                loading ?
                    <LoadingSpinner /> :
                    <Table variant='striped' colorScheme='yellow'>
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
                            {users.map(({ id, name, username, address, phoneNumber, email, }) => (
                                <Tr>
                                    <Td>{id}</Td>
                                    <Td>{name}</Td>
                                    <Td>{username}</Td>
                                    <Td>{address}</Td>
                                    <Td>{phoneNumber}</Td>
                                    <Td>{email}</Td>
                                    <Td textAlign='center'><Link to={`/dashboard/users/${id}`}><Icon as={MdLaunch} /></Link></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
            }
        </Flex>
    )
}