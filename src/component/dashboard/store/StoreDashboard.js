import { Box, Button, Flex, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { MdLaunch } from 'react-icons/md';
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
                    <Table variant='striped' colorScheme='yellow'>
                        <Thead>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th textAlign='center'>Manage</Th>
                        </Thead>
                        <Tbody>
                            {stores.map(({ id, name, description }) => (
                                <Tr>
                                    <Td>{id}</Td>
                                    <Td>{name}</Td>
                                    <Td>{description}</Td>
                                    <Td textAlign='center'><Link to={`/dashboard/stores/${id}`}><Icon as={MdLaunch} /></Link></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
            }
        </Flex>
    )
}