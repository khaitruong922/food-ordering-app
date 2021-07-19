import React from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
const useStyles = makeStyles(
    {
        paper:{
            backgroundColor: '#ffdebd',
            borderRadius: "10px"
        },
        btn: {
            backgroundColor: '#ffcf9e',
            borderRadius: '10px',
            '&:hover':{
                backgroundColor: '#ffdebd'
            }
        },
        text: {
            color : '#000000',
            textDecoration: 'none'
        },
    
    }
)
export default function SignUp() {
    const classes = useStyles()
    const paperStye = { padding: 30, height: '90vh', width: 300, margin: "90px auto"}
    return (
        <Grid>
            <NavBar/>
            <Paper elevation={10} style={paperStye} className={classes.paper}>
                <Grid align="center">
                    <h2>Sign Up</h2>
                </Grid>
                <TextField label="Name" placeholder="Enter Your Name" fullWidth required />
                <TextField label="Email" placeholder="Enter Email" fullWidth/>
                <TextField label="Phone" placeholder="Enter Phone Number" fullWidth required />
                <TextField label="Address" placeholder="Enter Address" fullWidth required />
                <TextField label="Username" placeholder="Enter Username" fullWidth required />
                <TextField label="Password" placeholder="Enter Password" type="password" fullWidth required />
                <TextField label="Confirm Password" placeholder="Confirm Your Password" type="password" fullWidth required />
                <Box height="20px"></Box>
                <Button className ={classes.btn} type="submit" variant="contained" fullWidth>Create Account</Button>
                <Box height="20px"></Box>
                <Typography align="center">
                    ______________________
                </Typography>
                <Box height="10px"></Box>
                <Typography className={classes.text} align="center">
                    Already have an account ?
                </Typography>
                <Box height="10px"></Box>
                <Grid align="center">
                <Button className ={classes.btn} type="submit" variant="contained" href="/login">Log In</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}