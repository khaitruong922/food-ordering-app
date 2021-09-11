import { Box, Button, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import isValidImageFile from '../../../util/isValidImageFile';
import { useErrorToast, useSuccessToast } from "../../shared/toast";
export default function EditProductModal({ product, isOpen, onClose, refresh }) {
    const { id, name, image, description, price } = product
    const { value: nameInput, onInput: onNameInput } = useInput(name)
    const { value: priceInput, onInput: onPriceInput } = useInput(price)
    const { value: descriptionInput, onInput: onDescriptionInput } = useInput(description)
    const [file, setFile] = useState(null)
    const { url: imageUrl } = image || {}
    const previewUrl = useMemo(() => file ? URL.createObjectURL(file) : imageUrl, [file])
    const [loading, setLoading] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    async function onFormSubmit(e) {
        e.preventDefault()
        const _price = Number(priceInput)
        if (_price === NaN) {
            errorToast({ title: 'Invalid price', description: 'Price must be a positive number!' })
            return
        }
        if (_price < 0) {
            errorToast({ title: 'Invalid price', description: `Price can't be negative!` })
            return
        }
        try {
            setLoading(true)
            const { data } = await api.patch(`/products/${id}`, { name: nameInput, price: _price, description: descriptionInput })
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                await api.post(`/products/${id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
            successToast({ title: 'Edit product sucessfully!', description: '', })
            refresh()
            onClose()
        } catch (e) {
            console.log(e)
            errorToast({
                title: 'Edit product failed!',
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
            errorToast({
                title: 'Image upload failed!',
                description: message,
            })
            return
        }
        setFile(file)
    }

    function handleModalClose() {
        setFile(null)
        onClose()
    }

    return (
        <Modal preserveScrollBarGap closeOnOverlayClick isOpen={isOpen} onClose={handleModalClose}>
            <ModalOverlay />
            <ModalContent maxW='56rem'>
                <ModalHeader>Edit product #{id}</ModalHeader>
                <ModalBody>
                    <form onSubmit={onFormSubmit}>
                        <Flex direction='column' p={5} w='100%'>
                            <Flex justify='center' w='100%'>
                                <Flex direction='column' w='50%'>
                                    <FormControl id="name" mb={2}>
                                        <FormLabel>Name</FormLabel>
                                        <Input value={nameInput} onInput={onNameInput} required />
                                    </FormControl>
                                    <FormControl id="price" mb={2}>
                                        <FormLabel>Price</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                fontSize="1.2em"
                                                children="$"
                                            />
                                            <Input type='number' value={priceInput} onInput={onPriceInput} required />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="description" mb={2}>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea resize='none' noOfLines={3} value={descriptionInput} onInput={onDescriptionInput} />
                                    </FormControl>
                                </Flex>
                                <Box mx={5} />
                                <Flex direction='column' w='50%'>
                                    <FormControl id="image">
                                        <FormLabel>Image</FormLabel>
                                        <input type="file" onChange={onFileChange} />
                                    </FormControl>
                                    <Image objectFit='cover' h={300} my={5} src={previewUrl} alt={previewUrl} />
                                </Flex>
                            </Flex>
                            <Flex align='center' direction='column'>
                                <Button isLoading={loading} colorScheme='yellow' type="submit">Save</Button>
                            </Flex>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}