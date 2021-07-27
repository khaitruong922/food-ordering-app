import { Box, Button, Grid, makeStyles, Modal, Typography } from "@material-ui/core"
import { Fragment, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useHistory, useParams } from "react-router-dom"
import api from "../../../api/api"
import useApi from "../../../hook/useApi"
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
    }
}))

export default function StoreDetailDashboard() {
    const classes = useStyles()
    const { id } = useParams()
    const { data, error, loading, } = useApi({ endpoint: `/stores/${id}`, defaultValue: null })
    const { name, address, description, image: { url: imageUrl } = {}, subMenus = [] } = data || {}
    const { open, handleOpen, handleClose } = useModal()
    const history = useHistory()

    async function deleteStore() {
        try {
            console.log('Delete')
            await api.delete(`/stores/${id}`)
            history.push('/dashboard/stores')
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
                    </Fragment>
                )
            }
        </Box >
    )
}