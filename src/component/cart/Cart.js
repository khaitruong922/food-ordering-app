import { Box, Button, Hidden, makeStyles, Typography } from "@material-ui/core"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Fragment } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"
import useCartsStore from "../../store/useCartsStore"
import formatCurrency from "../../util/formatCurrency"
import CartItem from "./CartItem"

const useStyles = makeStyles((theme) => ({
    price: {
        fontWeight: 700,
    }
}))

export default function Cart({ storeId }) {
    const classes = useStyles()
    const productIds = useCartsStore(state => Object.keys(state.carts[storeId]?.products ?? {}))
    const total = useCartsStore(state => (state.carts[storeId]?.total))
    const checkout = useCartsStore(state => state.checkout)
    const createStoreCart = useCartsStore(state => state.createStoreCart)
    useEffect(() => {
        createStoreCart({ storeId })
    }, [])
    return (
        <Box p={2}>
            <Typography variant='h6'>Your cart</Typography>
            <Box height={10} />
            {productIds.map(productId => <CartItem key={productId} storeId={storeId} productId={productId} />)}
            <Box height={10} />
            {
                productIds.length > 0 ?
                    <Fragment>
                        <Box display='flex'>
                            <Typography className={classes.price}>Total</Typography>
                            <Box ml='auto'>
                                <Typography className={classes.price} align='right'>{formatCurrency(total)}</Typography>
                            </Box>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Button component={Link} to={`/stores/${storeId}/checkout`} startIcon={<ShoppingCartIcon color='secondary' />} color='secondary'>Checkout</Button>
                        </Box>
                    </Fragment> :
                    <Typography align='center' variant='subtitle2'>Your cart is empty</Typography>
            }

        </Box >
    )
}