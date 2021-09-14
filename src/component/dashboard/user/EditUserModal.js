import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import { useErrorToast, useSuccessToast } from "../../shared/toast";

export default function EditUserModal({ user, isOpen, onClose, refresh }) {
    const { id, name, phoneNumber, address, email } = user
    const { value: nameInput, onInput: onNameInput } = useInput(name)
    const { value: emailInput, onInput: onEmailInput } = useInput(email)
    const { value: phoneNumberInput, onInput: onPhoneNumberInput } = useInput(phoneNumber)
    const { value: addressInput, onInput: onAddressInput } = useInput(address)
    const [submitting, setSubmitting] = useState(false)
    const errorToast = useErrorToast()
    const successToast = useSuccessToast()
    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            setSubmitting(true)
            const { data } = await api.patch(`/users/${id}`, { name: nameInput, address: addressInput, phoneNumber: phoneNumberInput, email: emailInput })
            successToast({ title: 'Update account sucessfully!', description: '', })
            refresh()
            onClose()
        } catch (e) {
            console.log(e)
            errorToast({
                title: 'Update account failed!',
                description: e.response?.data?.message
            })
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Modal preserveScrollBarGap closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW='56rem' p={4}>
                <ModalHeader>Update account #{id}</ModalHeader>
                <ModalBody>
                    <form onSubmit={onFormSubmit}>
                        <FormControl id="name" isRequired mb={2}>
                            <FormLabel>Name</FormLabel>
                            <Input value={nameInput} onInput={onNameInput} />
                        </FormControl>
                        <FormControl id="email" isRequired mb={2}>
                            <FormLabel>Email</FormLabel>
                            <Input value={emailInput} onInput={onEmailInput} />
                        </FormControl>
                        <FormControl id="phone-number" isRequired mb={2}>
                            <FormLabel>Phone number</FormLabel>
                            <Input value={phoneNumberInput} onInput={onPhoneNumberInput} />
                        </FormControl>
                        <FormControl id="address" isRequired mb={2}>
                            <FormLabel>Address</FormLabel>
                            <Input value={addressInput} onInput={onAddressInput} />
                        </FormControl>
                        <Flex align='center'>
                            <Button
                                isLoading={submitting}
                                mx='auto'
                                mt={4}
                                colorScheme="teal"
                                type="submit">Submit
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}