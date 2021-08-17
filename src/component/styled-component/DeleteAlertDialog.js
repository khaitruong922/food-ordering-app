import { AlertDialog, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

export default function DeleteAlertDialog({
    isOpen = false,
    leastDestructiveRef,
    onClose,
    header = 'Warning!',
    content = 'This action cannot be undone.'
}) {
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={leastDestructiveRef}
            onClose={onClose}
            header={header}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>{header}</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogContent>{content}</AlertDialogContent>

                <AlertDialogFooter>
                    <Button ref={leastDestructiveRef} onClick={onClose}>
                        No
                    </Button>
                    <Button colorScheme="red" ml={3}>
                        Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}