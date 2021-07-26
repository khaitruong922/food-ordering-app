import { Box, IconButton, makeStyles, Table, TableContainer, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import useApi from "../../../hook/useApi";
import Spinner from "../../shared/Spinner";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}))


export default function UserDashboard() {
    const classes = useStyles()
    const { data: stores, loading, error } = useApi({ endpoint: '/users', defaultValue: [] })
    return (
        <Box display='flex' flexDirection='column' p={4}>
            <Box>
                <Typography variant='h4'>Users</Typography>
            </Box>
            <Box height={20}></Box>
            {
                loading ?
                    <Spinner /> :
                    <TableContainer component={Paper}>
                        <Table stickyHeader className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">Username</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Phone number</TableCell>
                                    <TableCell align="left">Role</TableCell>
                                    <TableCell padding='none' align='center'>Manage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stores.map(({ id, username, name, address, phoneNumber, email, role }) => (
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {id}
                                        </TableCell>
                                        <TableCell align="left">{username}</TableCell>
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">{address}</TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">{phoneNumber}</TableCell>
                                        <TableCell align="left">{role}</TableCell>
                                        <TableCell padding='none' align='center'>
                                            <IconButton disableTouchRipple disableRipple><LaunchIcon color='secondary' /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }

        </Box>
    )
}