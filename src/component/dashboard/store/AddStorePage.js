import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text, Textarea, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import isValidImageFile from "../../../util/isValidImageFile";


export default function AddStorePage() {
    const { value: name, onInput: onNameInput } = useInput('')
    const { value: address, onInput: onAddressInput } = useInput('')
    const { value: description, onInput: onDescriptionInput } = useInput('')
    const toast = useToast()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await api.post('/stores', { name, address, description })
            const { id } = data
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                await api.post(`/stores/${id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
            toast({
                position: 'bottom-right',
                title: 'Create store sucessfully!',
                description: '',
                status: 'success',
                isClosable: true,
            })
        } catch (e) {
            const message = e.response.data.message[0]
            toast({
                position: 'bottom-right',
                title: 'Create store failed!',
                description: message,
                status: 'error',
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }
    }

    function onFileChange(e) {
        const file = e.target.files[0]
        const { valid, message } = isValidImageFile(file)
        if (!valid) {
            setFile(null)
            e.target.value = null
            toast({
                position: 'bottom-right',
                title: 'Image upload failed!',
                description: message,
                status: 'error',
                isClosable: true,
            })
            return
        }
        setFile(file)
    }

    return (
        <Flex direction='column' align='center' p={5}>
            <Text fontSize='4xl' fontWeight={600}>Add new store</Text>
            <Box w={400}>
                <form onSubmit={onFormSubmit}>
                    <Flex direction='column'>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input value={name} onInput={onNameInput} required />
                        </FormControl>
                        <FormControl id="address">
                            <FormLabel>Address</FormLabel>
                            <Input value={address} onInput={onAddressInput} required />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Description</FormLabel>
                            <Textarea resize='none' noOfLines={3} value={description} onInput={onDescriptionInput} />
                        </FormControl>
                        <FormControl id="image">
                            <FormLabel>Image</FormLabel>
                            <input type="file" onChange={onFileChange} />
                        </FormControl>
                        <Flex align='center' direction='column'>
                            <Image objectFit='cover' h={300} my={5} src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : null} />
                            <Button isLoading={loading} colorScheme='yellow' type="submit">Submit</Button>
                        </Flex>
                    </Flex>
                </form>
            </Box>

        </Flex>
    )
}