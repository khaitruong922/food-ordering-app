import { Box, Button, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import isValidImageFile from '../../../util/isValidImageFile';
import { useErrorToast, useSuccessToast } from "../../shared/toast";

export default function AddStoreModal({ isOpen, onClose, refresh }) {
    const { value: name, onInput: onNameInput } = useInput('')
    const { value: address, onInput: onAddressInput } = useInput('')
    const { value: description, onInput: onDescriptionInput } = useInput('')
    const [file, setFile] = useState(null)
    const previewUrl = useMemo(() => file ? URL.createObjectURL(file) : null, [file])
    
    const [loading, setLoading] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await api.post(`/stores`, { name, address, description })
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
            successToast({ title: 'Add store sucessfully!', description: '', })
            refresh()
            onClose()
        } catch (e) {
            console.log(e)
            errorToast({
                title: 'Add store failed!',
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
                <ModalHeader>Add new store</ModalHeader>
                <ModalBody>
                    <form onSubmit={onFormSubmit}>
                        <Flex direction='column' p={5} w='100%'>
                            <Flex justify='center' w='100%'>
                                <Flex direction='column' w='50%'>
                                    <FormControl id="name" mb={2}>
                                        <FormLabel>Name</FormLabel>
                                        <Input value={name} onInput={onNameInput} required />
                                    </FormControl>
                                    <FormControl id="address" mb={2}>
                                        <FormLabel>Address</FormLabel>
                                        <Input value={address} onInput={onAddressInput} required />
                                    </FormControl>
                                    <FormControl id="description" mb={2}>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea resize='none' noOfLines={3} value={description} onInput={onDescriptionInput} />
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
                                <Button isLoading={loading} colorScheme='yellow' type="submit">Submit</Button>
                            </Flex>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}