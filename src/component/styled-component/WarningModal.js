import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    deleteBtn: {
        backgroundColor: '#ff0000',
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: '#dd0000',
        },
    }
}))


export default function WarningModal({ open, onClose, title = 'Title', message = 'Warning: This action cannot be undone', onConfirm }) {
    const classes = useStyles()
    return (
        <Modal open={open} onClose={onClose}>
            <Box bgcolor='#fff' mx='auto' position='relative' top='25%' width='30%' minWidth={500} height='20%' display='flex' flexDirection='column' p={3}>
                <Typography variant='h6'>{title}</Typography>
                <Box height={5} />
                <Typography color='error'>{message}</Typography>
                <Box mt='auto' display='flex' justifyContent='flex-end'>
                    <Button variant='contained' onClick={onClose}>Cancel</Button>
                    <Box width={10} />
                    <Button variant='contained' className={classes.deleteBtn} onClick={onConfirm}>Confirm</Button>
                </Box>
            </Box>
        </Modal>
    )

}