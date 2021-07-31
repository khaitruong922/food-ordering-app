import { Box, Grid, makeStyles, Typography } from "@material-ui/core"
import { Fragment, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import useApi from "../../hook/useApi"
import useCartsStore from "../../store/useCartsStore"
import Spinner from "../shared/Spinner"
import AppDivider from "../styled-component/AppDivider"
import ProductMenu from "./ProductMenu"

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
    }
}))

export default function StorePage() {
    const classes = useStyles()
    const { id } = useParams()
    const { data, error, loading, setLoading } = useApi({ endpoint: `/stores/${id}`, defaultValue: null })
    const { name, address, description, image: { url: imageUrl } = {}, subMenus = [] } = data || {}
    const carts = useCartsStore(state => state.carts)

    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])
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
                                </Box>
                            </Grid>
                        </Grid>
                        <AppDivider />
                        <Box height={10} />
                        {subMenus.map(menu => <ProductMenu key={menu.id} menu={menu} storeId={id} />)}
                    </Fragment>
                )
            }
        </Box >
    )
}