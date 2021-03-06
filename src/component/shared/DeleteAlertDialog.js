import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

export default function DeleteAlertDialog({
    isOpen = false,
    leastDestructiveRef,
    onClose,
    header = 'Warning!',
    content = 'This action cannot be undone.',
    onDeleteClick,
    isLoading,
}) {
    return (
        <AlertDialog
            preserveScrollBarGap
            closeOnOverlayClick
            isOpen={isOpen}
            leastDestructiveRef={leastDestructiveRef}
            onClose={onClose}
            header={header}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>{header}</AlertDialogHeader>
                    <AlertDialogBody> {content}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={leastDestructiveRef} onClick={onClose}>
                            No
                        </Button>
                        <Button isLoading={isLoading} colorScheme="red" ml={3} onClick={onDeleteClick}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}