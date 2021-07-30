import { Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import React from 'react'
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: theme.btn.borderRadius,
        backgroundColor: '000000',
        height: 'flex',
    },
}))

const ReviewForm = ({ back, name, address, phoneNumber, note, payment }) => {
    const classes = useStyles();
    return (
        <Box className={classes.container} display='flex' flexDirection='column' width={700} mx='auto' boxShadow={5} my='20px' p={5}>
            <Box flexDirection='column' display='flex' justifyContent='center'>
                <Typography variant='h6' align='center' gutterBottom>
                    Review
                </Typography>
                <Box flexDirection='column' mx='50px' mb='20px' mt='20px'>
                    <Typography>
                        Name : {name}
                    </Typography>
                    <Typography>
                        Ship Address : {address}
                    </Typography>
                    <Typography>
                        Phone Number : {phoneNumber}
                    </Typography>
                    <Typography>
                        Note : {note}
                    </Typography>
                    <Typography>
                        Payment Method : {payment}
                    </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: 10 }}>
                    <Button onClick={back}>Back</Button>
                    <Button component={Link} to='/'>Confirm</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ReviewForm
