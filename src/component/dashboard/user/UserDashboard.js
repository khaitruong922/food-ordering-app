import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import LaunchIcon from '@material-ui/icons/Launch';
import { Link } from 'react-router-dom';
import useApiGet from "../../../hook/useApiGet";
import LoadingSpinner from "../../shared/LoadingSpinner";


export default function UserDashboard() {
    const { data: users, loading, error, refresh } = useApiGet({ endpoint: '/users', defaultValue: [] })

    return (
        <Flex direction='column' p={5}>
            <Text fontSize='4xl' align='center' mb={2}>Users</Text>
            {
                loading ?
                    <LoadingSpinner /> :
                    <Table variant='striped' colorScheme='orange'>
                        <Thead>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Username</Th>
                            <Th>Address</Th>
                            <Th>Phone number</Th>
                            <Th>Email</Th>
                            <Th>Manage</Th>
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
                                    <Td><Link to={`/dashboard/users/${id}`}><LaunchIcon /></Link></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
            }
        </Flex>
    )
}