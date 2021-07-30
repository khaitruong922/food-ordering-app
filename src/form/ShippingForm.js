import { Typography, Box, TextField, Button, FormControlLabel, FormControl, Radio, RadioGroup } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useInput from '../hook/useInput';
const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: theme.btn.borderRadius,
        backgroundColor: '000000',
        height: 'flex',
    },
    textField: {

    }
}))

const ShippingForm = ({ next, nameSource, phoneNumberSource, addressSource, noteSource, paymentSource,
    nameChange, phoneNumberChange, addressChange, noteChange, paymentChange }) => {
    const classes = useStyles();
    return (
        <Box className={classes.container} display='flex' flexDirection='column' width={700} mx='auto' boxShadow={5} my='10px' p={5}>

            <Box flexDirection='column' display='flex' justifyContent='center'>
                <form>
                    <Box flexDirection='column' mx='50px' mb='20px'>
                        <TextField variant="outlined" value={nameSource} onChange={nameChange} label='Name' fullWidth required />
                        <Box height='10px'></Box>
                        <TextField variant="outlined" value={phoneNumberSource} onChange={phoneNumberChange} label='PhoneNumber' fullWidth required />
                        <Box height='10px'></Box>
                        <TextField variant="outlined" value={addressSource} onChange={addressChange} label='Address' fullWidth required />
                        <Box height='10px'></Box>
                        <TextField variant="outlined" value={noteSource} onChange={noteChange} label='Shipping Note' fullWidth />
                        <Box flexDirection='column' mb='20px' mt='20px'>
                            <Typography>
                                Choose your payment method :
                            </Typography>
                            <FormControl>
                                <RadioGroup value={paymentSource} onChange={paymentChange}>
                                    <FormControlLabel value='COD' control={<Radio />} label='COD' />
                                    <FormControlLabel value='Pay Through MoMo' control={<Radio />} label='Pay online through MoMo' />
                                    <FormControlLabel value='Pay Through Zalo' control={<Radio />} label='Pay through ZaloPay' />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: 10 }}>
                        <Button component={Link} to='/cart'>Back To Cart</Button>
                        <Button type="submit" onClick={next}>Next</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default ShippingForm
