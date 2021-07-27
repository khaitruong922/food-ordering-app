import { Box, Button, Grid, IconButton, makeStyles, Table, TableContainer, TextField, Typography } from "@material-ui/core"
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import LaunchIcon from '@material-ui/icons/Launch'
import React, { Fragment, useEffect } from 'react'
import { Helmet } from "react-helmet-async"
import { Link, useHistory, useParams } from "react-router-dom"
import api from "../../../api/api"
import useApi from "../../../hook/useApi"
import useInput from "../../../hook/useInput"
import useModal from "../../../hook/useModal"
import Spinner from "../../shared/Spinner"
import AppDivider from "../../styled-component/AppDivider"
import WarningModal from "../../styled-component/WarningModal"

const infoHeight = 250

const useStyles = makeStyles((theme) => ({
    address: {
        color: theme.palette.grey.main,
        fontWeight: 600,
    },
    name: {
        fontWeight: 700,
    },
    description: {
        color: theme.palette.grey.main,
    },
    image: {
        width: '100%',
        height: 250,
        objectFit: 'cover'
    },
    deleteBtn: {
        backgroundColor: '#ff0000',
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: '#dd0000',
        },
    },
    input: {
        height: 40,
    },
    addBtn: {
        height: 40,
    }
}))

export default function MenuDashboard() {
    const classes = useStyles()
    const { id } = useParams()
    const { data, error, loading, setData, refresh, setLoading } = useApi({ endpoint: `/sub-menus/${id}`, defaultValue: null })
    const { name, products = [], store } = data || {}
    const { storeId } = store || {}
    const { open, handleOpen, handleClose } = useModal()
    const history = useHistory()

    useEffect(() => {
        setLoading(true)
    }, [id])

    async function deleteMenu() {
        try {
            await api.delete(`/sub-menus/${id}`)
            history.push(`/dashboard/stores/${storeId}`)
        }
        catch (e) {

        } finally {
            handleClose()
        }
    }

    return (
        <Box mt={2} height='100%' width='75%' mx='auto'>
            {loading ? <Spinner /> :
                (
                    <Fragment>
                        <Helmet title={name} />
                        <Box p={4} display='flex' flexDirection='column' alignItems='flex-start'>
                            <Typography className={classes.name} align='center' variant='h5'>{name}</Typography>

                            <Box mt={2} display='flex'>
                                <Button variant='contained' color='secondary'>Edit</Button>
                                <Box width={10} />
                                <Button onClick={handleOpen} variant='contained' className={classes.deleteBtn} >Delete</Button>
                                <WarningModal
                                    open={open}
                                    onClose={handleClose}
                                    onConfirm={deleteMenu}
                                    title={`Delete ${name}?`}
                                />
                            </Box>
                        </Box>
                    </Fragment>
                )
            }
        </Box >
    )
}