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


export default function CategoryDashboard() {
    const classes = useStyles()
    const { data: stores, loading, error } = useApi({ endpoint: '/categories', defaultValue: [] })
    return (
        <Box display='flex' flexDirection='column' p={4}>
            <Box>
                <Typography variant='h4'>Categories</Typography>
                <Box height={20}></Box>
                <Button variant='contained' color='secondary'>Add category</Button>
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
                                    <TableCell align="left">Number of stores</TableCell>
                                    <TableCell padding='none' align='center'>Manage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stores.map(({ id, name }) => (
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {id}
                                        </TableCell>
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">0</TableCell>
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