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

export default function StoreDetailDashboard() {
    const classes = useStyles()
    const { id } = useParams()
    const { data, error, loading, setData, refresh, setLoading } = useApi({ endpoint: `/stores/${id}`, defaultValue: null })
    const { name, address, description, image: { url: imageUrl } = {}, subMenus = [] } = data || {}
    const { open, handleOpen, handleClose } = useModal()
    const { value: addedMenuName, onInput: onAddedMenuNameInput, reset: resetAddedMenuNameInput } = useInput('')
    const history = useHistory()

    useEffect(() => {
        setLoading(true)
    }, [id])

    async function deleteStore() {
        try {
            await api.delete(`/stores/${id}`)
            history.push('/dashboard/stores')
        }
        catch (e) {

        } finally {
            handleClose()
        }
    }

    async function addMenu(e) {
        e.preventDefault()
        if (!addedMenuName) return
        try {
            resetAddedMenuNameInput()
            const { data: addedMenu } = await api.post(`/stores/${id}/sub-menus`, { name: addedMenuName })
            refresh()

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box mt={2} height='100%' width='75%' mx='auto'>
            {loading ? <Spinner /> :
                (
                    <Fragment>
                        <Helmet title={name} />
                        <Grid container>
                            <Grid item sm={12} md={4}>
                                <Box p={4}>
                                    <img alt={name} className={classes.image} src={imageUrl} />
                                </Box>
                            </Grid>
                            <Grid item sm={12} md={8}>
                                <Box p={4} display='flex' flexDirection='column' alignItems='flex-start'>
                                    <Typography className={classes.name} align='center' variant='h5'>{name}</Typography>
                                    <Box height={5} />
                                    <Typography className={classes.address} align='center'>{address}</Typography>
                                    <Box height={5} />
                                    <Typography className={classes.description} align='center'>{description}</Typography>
                                    <Box mt={2} display='flex'>
                                        <Button variant='contained' color='secondary'>Edit</Button>
                                        <Box width={10} />
                                        <Button onClick={handleOpen} variant='contained' className={classes.deleteBtn} >Delete</Button>
                                        <WarningModal
                                            open={open}
                                            onClose={handleClose}
                                            onConfirm={deleteStore}
                                            title={`Delete ${name}?`}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <AppDivider />
                        <Box height={10} />
                        <Typography variant='h5'>Menu</Typography>
                        <Box height={10} />

                        <form onSubmit={addMenu}>
                            <Box display='flex' alignItems='center' height={50}>
                                <TextField InputProps={{ className: classes.input }} value={addedMenuName} onInput={onAddedMenuNameInput} variant='outlined' placeholder='Enter menu name' fullWidth />
                                <Box width={5} />
                                <Button type='submit' className={classes.addBtn} variant='contained' color='secondary'>Add</Button>
                            </Box>
                        </form>

                        <Box height={10} />

                        <TableContainer component={Paper}>
                            <Table stickyHeader className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Category</TableCell>
                                        <TableCell padding='none' align='center'>Manage</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subMenus.map(({ id, name, products = [] }) => (
                                        <TableRow key={id}>
                                            <TableCell component="th" scope="row" align="left">{name} ({products.length})</TableCell>
                                            <TableCell padding='none' align='center'>
                                                <IconButton component={Link} to={`/dashboard/menus/${id}`} disableTouchRipple disableRipple><LaunchIcon color='secondary' /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Fragment>
                )
            }
        </Box >
    )
}