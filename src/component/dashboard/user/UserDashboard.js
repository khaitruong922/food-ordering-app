import { Box, IconButton, makeStyles, Table, TableContainer, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import api from "../../../api/api";
import useApi from "../../../hook/useApi";
import useModal from "../../../hook/useModal";
import Spinner from "../../shared/Spinner";
import WarningModal from '../../../component/styled-component/WarningModal'

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    deleteIcon: {
        color: "#ff0000"
    }
}))

function UserRow({ user, refresh }) {
    const classes = useStyles()
    const { id, username, name, address, phoneNumber, email, role } = user
    const { open, handleOpen, handleClose } = useModal()
    const isAdmin = role === 'admin'

    async function deleteUser() {
        try {
            await api.delete(`/users/${id}`)
            refresh()
        }
        catch (e) {

        }
    }
    return (
        <TableRow>
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
                {
                    isAdmin ||
                    (<Box onClick={handleOpen}>
                        <IconButton><DeleteIcon className={classes.deleteIcon} /></IconButton>
                    </Box>)
                }
            </TableCell>
            <WarningModal
                open={open}
                onClose={handleClose}
                onConfirm={deleteUser}
                title={`Delete user ${id} - ${name}?`}
            />
        </TableRow>
    )
}


export default function UserDashboard() {
    const classes = useStyles()
    const { data: users, loading, error, refresh } = useApi({ endpoint: '/users', defaultValue: [] })

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
                                    <TableCell padding='none' align='center'>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => <UserRow key={user.id} user={user} refresh={refresh} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }

        </Box>
    )
}