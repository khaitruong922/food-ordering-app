import React from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
const useStyles = makeStyles(
    {
        paper:{
            backgroundColor: '#ffd7dd'
        },
        btn: {
            backgroundColor: '#ffbdc7',
            borderRadius: '10px',
            '&:hover':{
                backgroundColor: '#ffcad2'
            }
        },
        text: {
            color : '#000000',
            textDecoration: 'none'
        },
        text_field: {
            borderStyle : 'solid',
        }
    
    }
)
export default function Login() {
    const classes = useStyles()
    const paperStye = { padding: 30, height: '65vh', width: 300, margin: "90px auto"}
    return (
        <Grid>
            <NavBar/>
            <Paper elevation={10} style={paperStye} className={classes.paper}>
                <Grid align="center">
                    <h2>Sign In</h2>
                </Grid>
                <TextField className="text_field" label="Username" placeholder="Enter Username" fullWidth required />
                <TextField className="text_field" label="Password" placeholder="Enter Password" type="password" fullWidth required />
                <FormControlLabel className={classes.text}
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember Me"
                />
                <Box height="20px"></Box>
                <Button className ={classes.btn} type="submit" variant="contained" fullWidth>Sign In</Button>
                <Box height="20px"></Box>
                <Typography align="center">
                    <Link className={classes.text} href="#">
                        Forgot Password ?
                    </Link>
                </Typography>
                <Typography align="center">
                    ______________________
                </Typography>
                <Box height="10px"></Box>
                <Typography className={classes.text} align="center">
                    Do not have an account ?
                </Typography>
                <Box height="10px"></Box>
                <Grid align="center">
                <Button className ={classes.btn} type="submit" variant="contained" >Sign Up</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}