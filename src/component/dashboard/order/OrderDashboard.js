import { Box, IconButton, makeStyles, Table, TableContainer, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import useApi from "../../../hook/useApi";
import formatCurrency from "../../../util/formatCurrency";
import Spinner from "../../shared/Spinner";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}))


export default function OrderDashboard() {
    const classes = useStyles()
    const { data: stores, loading, error } = useApi({ endpoint: '/orders', defaultValue: [] })
    return (
        <Box display='flex' flexDirection='column' p={4}>
            <Box>
                <Typography variant='h4'>Orders</Typography>
                <Box height={20}></Box>
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
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Total</TableCell>
                                    <TableCell padding='none' align='center'>Manage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stores.map(({ id, status, totalPrice }) => (
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {id}
                                        </TableCell>
                                        <TableCell align="left">{status}</TableCell>
                                        <TableCell align="left">{formatCurrency(totalPrice)}</TableCell>
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