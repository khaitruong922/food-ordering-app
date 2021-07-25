import { Box, Button, IconButton, makeStyles, Table, TableContainer, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StorefrontIcon from '@material-ui/icons/Storefront';
import React from 'react';
import useApi from "../../hook/useApi";
import Spinner from "../Spinner";
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}))


export default function StoreDashboard() {
    const classes = useStyles()
    const { data: stores, loading, error } = useApi({ endpoint: '/stores', defaultValue: [] })
    return (
        <Box display='flex' flexDirection='column' p={4}>
            <Box>
                <Typography variant='h4'>Stores</Typography>
                <Box height={20}></Box>
                <Button variant='contained' color='secondary'>Add store</Button>
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
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell padding='none' align='center'>Manage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stores.map(({ id, name, address, description }) => (
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {id}
                                        </TableCell>
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">{address}</TableCell>
                                        <TableCell align="left">{description}</TableCell>
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