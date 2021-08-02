import { Box, Button, makeStyles, Step, StepLabel, Stepper, Table, TableContainer, TableFooter, TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../component/shared/Spinner';
import useInput from '../hook/useInput';
import useAuthStore from '../store/useAuthStore';
import useCartsStore from '../store/useCartsStore';
import formatCurrency from '../util/formatCurrency';
import getArrayEntries from '../util/getArrayEntries';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
const useStyles = makeStyles((theme) => ({
    total: {
        fontWeight: 700,
        fontSize: 14,
        color: '#111111'
    },
    successText: {
        color: '#5cb85c',
        fontWeight: 600,
    },
    successIcon: {
        color: '#5cb85c',
        width: 50,
        height: 50,
    },
    bold: {
        fontWeight: 700,
    }
}))
const steps = ["Shipping Information", "Review", "Completed"]

function Info({ label, value }) {
    const classes = useStyles();
    return (
        <Box py={0.5} display='flex'>
            <Box>
                <Typography className={classes.bold}>{label}</Typography>
            </Box>
            <Box ml='auto'>
                <Typography>{value}</Typography>
            </Box>
        </Box>)
}

export default function CheckoutPage() {
    const classes = useStyles();
    const { id: storeId } = useParams()
    const [activeStep, setActiveStep] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const user = useAuthStore(state => state.user)
    const { value: name, onInput: onNameInput } = useInput(user ? user.name : '')
    const { value: phoneNumber, onInput: onPhoneNumberInput } = useInput(user ? user.phoneNumber : '')
    const { value: address, onInput: onAddressInput } = useInput(user ? user.address : '')
    const { value: note, onInput: onNoteInput } = useInput('')
    const cart = useCartsStore(state => state.carts[storeId])
    const products = getArrayEntries(cart.products)
    const total = cart.total
    const submitOrder = useCartsStore(state => state.submitOrder)
    function nextStep() {
        setActiveStep(activeStep + 1);
    }
    function prevStep() {
        setActiveStep(activeStep - 1);
    }
    async function handleOrderSubmit(e) {
        e.preventDefault()
        if (submitting) return
        setSubmitting(true)
        const data = await submitOrder({ storeId, address, note })
        console.log(data)
        if (data) nextStep()
    }

    return (
        <Box width='50%' minWidth={500} display='flex' mx='auto' flexDirection='column' alignItems='center' py={5}>
            <Box>
                <Typography variant='h3' align='center'>
                    Checkout
                </Typography>
            </Box>
            <Box height={25} />
            <Box width='100%'>
                <Stepper activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>

                    ))}
                </Stepper>
                <Box height={15} />
                <Box borderRadius={20} display='flex' flexDirection='column' justifyContent='center' boxShadow={5} py={5} px={10}>
                    <form onSubmit={handleOrderSubmit}>
                        {activeStep === 0 &&
                            <Box>
                                <Typography variant='h5' align='center' gutterBottom>
                                    Shipping Information
                                </Typography>
                                <Box height={20} />
                                <Box>
                                    <TextField variant="outlined" value={name} onInput={onNameInput} label='Name' fullWidth required />
                                    <Box height='10px'></Box>
                                    <TextField variant="outlined" value={phoneNumber} onInput={onPhoneNumberInput} label='Phone number' fullWidth required />
                                    <Box height='10px'></Box>
                                    <TextField variant="outlined" value={address} onInput={onAddressInput} label='Address' fullWidth required />
                                    <Box height='10px'></Box>
                                    <TextField variant="outlined" value={note} onInput={onNoteInput} label='Note' rows={3} multiline fullWidth />
                                </Box>
                                <Box height={20} />
                                <Box display='flex'>
                                    <Box flex={1}>
                                        <Button fullWidth component={Link} to={`/stores/${storeId}`}>Back to store</Button>
                                    </Box>
                                    <Box flex={1}>
                                        <Button fullWidth onClick={nextStep}>Next</Button>
                                    </Box>
                                </Box>
                            </Box>
                        }
                        {
                            activeStep === 1 &&
                            <Box>
                                <Typography variant='h5' align='center' gutterBottom>
                                    Review
                                </Typography>
                                <Box height={20} />

                                <Info label='Name' value={name} />
                                <Info label='Address' value={address} />
                                <Info label='Phone number' value={phoneNumber} />
                                <Info label='Note' />
                                <Typography style={{ wordWrap: "break-word" }}>{note}</Typography>
                                <Box height={10} />
                                <Typography style={{ fontWeight: 700 }}>Your order</Typography>
                                <Box height={10} />
                                <TableContainer component={Paper}>
                                    <Table stickyHeader className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell width='60%'>Item</TableCell>
                                                <TableCell width='10%' align='center'>Quantity</TableCell>
                                                <TableCell width='30%' align='right'>Subtotal</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map(({ data: { id, name, price }, quantity }) =>
                                                <TableRow key={id}>
                                                    <TableCell component="th" scope="row"> {name}</TableCell>
                                                    <TableCell align='center'> {quantity}</TableCell>
                                                    <TableCell align='right' > {formatCurrency(quantity * price)}</TableCell>
                                                </TableRow>
                                            )}

                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell className={classes.total} colSpan={2}>Total</TableCell>
                                                <TableCell className={classes.total} align='right'>{formatCurrency(total)}</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                                <Box height={20} />
                                <Box display='flex'>
                                    <Box flex={1}>
                                        <Button onClick={prevStep} fullWidth>Back</Button>
                                    </Box>
                                    <Box flex={1}>
                                        <Button type='submit' fullWidth>Confirm</Button>
                                    </Box>
                                </Box>
                                <Box height={50}>{submitting && <Spinner />}</Box>
                            </Box>
                        }
                        {
                            activeStep === 2 &&
                            <Box display='flex' flexDirection='column' alignItems='center'>
                                <Typography variant='h5' align='center' className={classes.successText}>
                                    Your order has been placed!
                                </Typography>
                                <Box height={20} />
                                <CheckCircleOutlineIcon color='success' className={classes.successIcon} />

                            </Box>
                        }
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

