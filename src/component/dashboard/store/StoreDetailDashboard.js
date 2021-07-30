import { Box, Button, Collapse, Grid, IconButton, makeStyles, Table, TableContainer, TextField, Typography } from "@material-ui/core"
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet-async"
import { Link, useHistory, useParams } from "react-router-dom"
import api from "../../../api/api"
import useApi from "../../../hook/useApi"
import useInput from "../../../hook/useInput"
import useModal from "../../../hook/useModal"
import mockProductImage from "../../../mock/mockProductImage"
import formatCurrency from '../../../util/formatCurrency'
import Spinner from "../../shared/Spinner"
import AppDivider from "../../styled-component/AppDivider"
import WarningModal from "../../styled-component/WarningModal"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

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
    },
    productImg: {
        width: '80%',
        height: 100,
        objectFit: 'cover'
    },
    addIcon: {
        color: '#00ff00'
    },
    deleteIcon: {
        color: theme.palette.error.main
    },
    editIcon: {
        color: '#ffd343'
    }
}))

function ProductRow({ product, refresh }) {
    const classes = useStyles()
    const { id, name, price, image } = product || {}
    const { url: imageUrl } = image || mockProductImage
    const { open, handleOpen, handleClose } = useModal()

    async function deleteProduct() {
        try {
            await api.delete(`/products/${id}`)
            refresh()
        }
        catch (e) {

        }
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">{id}</TableCell>
            <TableCell >
                <img src={imageUrl} className={classes.productImg} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell align='right'>{formatCurrency(price)}</TableCell>
            <TableCell align='center'>
                <IconButton>
                    <EditIcon className={classes.editIcon} />
                </IconButton>
            </TableCell>
            <TableCell align='center'>
                <Box onClick={handleOpen}>
                    <IconButton>
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </Box>
            </TableCell>
            <WarningModal
                open={open}
                onClose={handleClose}
                onConfirm={deleteProduct}
                title={`Delete ${name}?`}
            />
        </TableRow>
    )
}

function MenuRow({ menu, refresh }) {
    const classes = useStyles()
    const { id, name, products = [], } = menu
    const [open, setOpen] = useState(false);
    const { open: modalOpen, handleOpen: handleModalOpen, handleClose: handleModalClose } = useModal()

    async function deleteMenu() {
        try {
            await api.delete(`/sub-menus/${id}`)
            refresh()
        }
        catch (e) {

        }
    }

    return (
        <Fragment>
            <TableRow>
                <TableCell padding='none'>
                    <Box ml={2}>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Box>
                </TableCell>
                <TableCell component="th" align="left">{name} ({products.length})</TableCell>
                <TableCell align="center">
                    <IconButton component={Link} to={`/dashboard/menus/${id}/add-product`}>
                        <AddIcon className={classes.addIcon} />
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <Box onClick={handleModalOpen}>
                        <IconButton>
                            <DeleteIcon className={classes.deleteIcon} />
                        </IconButton>
                    </Box>
                </TableCell>
                <WarningModal
                    open={modalOpen}
                    onClose={handleModalClose}
                    onConfirm={deleteMenu}
                    title={`Delete ${name}?`}
                />
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table aria-label="products">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width='10%'>ID</TableCell>
                                        <TableCell width='20%'>Image</TableCell>
                                        <TableCell width='35%'>Name</TableCell>
                                        <TableCell width='25%' align='right'>Price</TableCell>
                                        <TableCell width='5%' align='center'>Edit</TableCell>
                                        <TableCell width='5%' align='center'>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => <ProductRow key={product.id} product={product} refresh={refresh} />)}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment >

    )

}



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
    }, [id, setLoading])

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
        <Box height='100%' width='75%' mx='auto'>
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
                                        <Button startIcon={<EditIcon />} variant='contained' color='secondary'>Edit</Button>
                                        <Box width={10} />
                                        <Button startIcon={<DeleteIcon />} onClick={handleOpen} variant='contained' className={classes.deleteBtn} >Delete</Button>
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
                                        <TableCell width='10%' />
                                        <TableCell width='70%' align="left">Menu</TableCell>
                                        <TableCell width='10%' align="center">Add product</TableCell>
                                        <TableCell width='10%' align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subMenus.map((menu) => (
                                        <MenuRow key={menu.id} menu={menu} refresh={refresh} />
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