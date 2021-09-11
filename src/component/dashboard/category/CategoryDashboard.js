import { Button, Flex, Icon, Input, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { MdLaunch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../../api/api';
import useApiGet from "../../../hook/useApiGet";
import useInput from '../../../hook/useInput';
import LoadingSpinner from "../../shared/LoadingSpinner";


export default function CategoryDashboard() {
    const { data: categories, loading, error, refresh } = useApiGet({ endpoint: '/categories', defaultValue: [] })
    const { onInput: onCategoryInput, value: category, reset: resetCategoryInput } = useInput('')
    const [submitting, setSubmitting] = useState(false)
    const toast = useToast()
    async function onAddCategorySubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        try {
            await api.post('/categories', { name: category })
            toast({
                position: 'bottom-right',
                title: 'Add category successfully!',
                status: 'success',
                isClosable: true,
            })
            refresh()
        } catch (e) {
            const message =
                e.response.data.statusCode === 500 ?
                    'Please provide a unique name!' :
                    e.response.data.message[0]
            toast({
                position: 'bottom-right',
                title: 'Add category failed!',
                description: message,
                status: 'error',
                isClosable: true,
            })
        } finally {
            setSubmitting(false)
            resetCategoryInput()
        }

    }
    return (
        <Flex direction='column' p={5}>
            <Text fontWeight={700} fontSize='2xl' textTransform='uppercase'>Categories</Text>
            <form onSubmit={onAddCategorySubmit}>
                <Flex justify='flex-end' my={5}>
                    <Input size='sm' value={category} onInput={onCategoryInput} w={300} placeholder='Category name' mr={2} required />
                    <Button size='sm' isLoading={submitting} type='submit' colorScheme='yellow'>Add category</Button>
                </Flex>
            </form>

            {
                loading ?
                    <LoadingSpinner /> :
                    <Table variant='striped' colorScheme='gray'>
                        <Thead>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th textAlign='center'>Manage</Th>
                        </Thead>
                        <Tbody>
                            {categories.map(({ id, name, }) => (
                                <Tr>
                                    <Td>{id}</Td>
                                    <Td>{name}</Td>
                                    <Td textAlign='center'><Link to={`/dashboard/categories/${id}`}><Icon as={MdLaunch} /></Link></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
            }
        </Flex>
    )
}