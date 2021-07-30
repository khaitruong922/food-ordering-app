import { Box, Stepper, Typography, Step, StepLabel } from '@material-ui/core'
import React, { useState } from 'react'
import useInput from '../hook/useInput';
import ShippingForm from '../form/ShippingForm'
import ReviewForm from '../form/ReviewForm'
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: theme.btn.borderRadius,
        backgroundColor: theme.palette.grey.main,
        height: 'flex',
        marginLeft: '250px',
        marginRight: '250px',

    },
    form: {
        borderRadius: '20px'
    }
}))
const steps = ["Adress and Payment", "Review"]

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { value: name, onChange: onNameChange } = useInput('')
    const { value: phoneNumber, onChange: onPhoneNumberChange } = useInput('')
    const { value: address, onChange: onAddressChange } = useInput('')
    const { value: note, onChange: onNoteChange } = useInput('')
    const { value: payment, onChange: onPaymentChange } = useInput('COD')
    function nextStep() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    function prevStep() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    const classes = useStyles();
    return (
        <Box className={classes.container} flexDirection='column' display='flex' justifyContent='center' my='20px'>
            <Box my='10px'>
                <Typography variant='h4' align='center' gutterBottom>
                    Check Out
                </Typography>
            </Box>
            <Box mx='70px' display='flex' justifyContent='cetner' flexDirection='column'>
                <Stepper className={classes.form} activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>

                    ))}
                </Stepper>
                {activeStep === 0 ? <ShippingForm
                    next={nextStep}
                    nameSource={name}
                    phoneNumberSource={phoneNumber}
                    addressSource={address}
                    noteSource={note}
                    paymentSource={payment}
                    nameChange={onNameChange}
                    phoneNumberChange={onPhoneNumberChange}
                    addressChange={onAddressChange}
                    noteChange={onNoteChange}
                    paymentChange= {onPaymentChange}
                    />
                    : <ReviewForm
                        back={prevStep}
                        name={name}
                        address={address}
                        phoneNumber={phoneNumber}
                        note={note}
                        payment={payment} />}
            </Box>

        </Box>
    )
}

export default CheckoutPage
