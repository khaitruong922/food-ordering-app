import { Box, Button, Flex, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { MdLaunch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useApiGet from "../../../hook/useApiGet";
import LoadingSpinner from "../../shared/LoadingSpinner";
import AddStoreModal from './AddStoreModal';


export default function StoreDashboard() {
    const { data: stores, refresh, loading, error } = useApiGet({ endpoint: '/stores', defaultValue: [] })
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <Flex direction='column' p={5}>
            <Text fontWeight={700} fontSize='2xl' textTransform='uppercase'>Stores</Text>
            <Box ml='auto' mb={5}>
                <Button onClick={onOpen} colorScheme='yellow'>Add store</Button>
                <AddStoreModal isOpen={isOpen} onClose={onClose} refresh={refresh} />
            </Box>
            {
                loading ?
                    <LoadingSpinner /> :
                    <Table variant='striped' colorScheme='gray'>
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