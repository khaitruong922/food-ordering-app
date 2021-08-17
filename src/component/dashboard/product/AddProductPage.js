import { Box, Button, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputLeftElement, Text, Textarea, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import useMessage from "../../../hook/useMessage";
import isValidImageFile from "../../../util/isValidImageFile";

export default function AddProductPage() {
    const { id: menuId } = useParams()
    const { value: name, onInput: onNameInput } = useInput('')
    const { value: price, onInput: onPriceInput } = useInput('')
    const { value: description, onInput: onDescriptionInput } = useInput('')
    const { message, success, setErrorMessage, setSuccessMessage } = useMessage()
    const [file, setFile] = useState(null)
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    async function onFormSubmit(e) {
        e.preventDefault()
        const _price = Number(price)
        if (_price === NaN) {
            setErrorMessage('Please enter a number for price')
            return
        }
        if (_price < 0) {
            setErrorMessage(`Price can't be negative!`)
            return
        }
        try {
            setLoading(true)
            const { data } = await api.post(`/sub-menus/${menuId}/products`, { name, price: _price, description })
            const { id } = data
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                await api.post(`/products/${id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
            toast({
                position: 'bottom-right',
                title: 'Add product sucessfully!',
                description: '',
                status: 'success',
                isClosable: true,
            })
        } catch (e) {
            const message = e.response.data.message[0]
            toast({
                position: 'bottom-right',
                title: 'Add product failed!',
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
            setErrorMessage(message)
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
            <Text fontSize='4xl' fontWeight={600}>Add new product</Text>
            <Box w={400}>
                <form onSubmit={onFormSubmit}>
                    <Flex direction='column'>
                        <FormControl id="Store ID">
                            <FormLabel>Menu ID</FormLabel>
                            <Input isReadOnly value={menuId} required />
                        </FormControl>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input value={name} onInput={onNameInput} required />
                        </FormControl>
                        <FormControl id="price">
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    fontSize="1.2em"
                                    children="$"
                                />
                                <Input type='number' value={price} onInput={onPriceInput} required />
                            </InputGroup>
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