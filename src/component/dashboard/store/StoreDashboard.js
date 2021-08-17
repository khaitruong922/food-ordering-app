import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import LaunchIcon from '@material-ui/icons/Launch';
import { Link } from 'react-router-dom';
import useApiGet from "../../../hook/useApiGet";
import LoadingSpinner from "../../shared/LoadingSpinner";


export default function StoreDashboard() {
    const { data: stores, loading, error } = useApiGet({ endpoint: '/stores', defaultValue: [] })
    return (
        <Flex direction='column' p={5}>
            <Text fontSize='4xl' align='center' mb={2}>Stores</Text>
            <Box ml='auto' mb={5}>
                <Link to='/dashboard/stores/add'><Button colorScheme='yellow'>Add store</Button></Link>
            </Box>
            {
                loading ?
                    <LoadingSpinner /> :
                    <Table variant='striped' colorScheme='orange'>
                        <Thead>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Manage</Th>
                        </Thead>
                        <Tbody>
                            {stores.map(({ id, name, description }) => (
                                <Tr>
                                    <Td>{id}</Td>
                                    <Td>{name}</Td>
                                    <Td>{description}</Td>
                                    <Td><Link to={`/dashboard/stores/${id}`}><LaunchIcon /></Link></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
            }
        </Flex>
    )
}