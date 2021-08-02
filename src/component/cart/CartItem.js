import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { Fragment } from "react";
import useCartsStore from "../../store/useCartsStore";
import formatCurrency from "../../util/formatCurrency";
import AppDivider from "../styled-component/AppDivider";

const useStyles = makeStyles((theme) => ({
    price: {
        fontWeight: 700,
    }
}))

export default function CartItem({ storeId, productId }) {
    const classes = useStyles()
    const quantity = useCartsStore(state => state.carts[storeId].products[productId].quantity)
    const product = useCartsStore(state => state.carts[storeId].products[productId].data)
    const addProductToCart = useCartsStore(state => state.addProductToCart)
    const decreaseProductQuantity = useCartsStore(state => state.decreaseProductQuantity)
    const { id, name, price } = product || {}
    return (
        <Fragment>
            <Box display='flex' alignItems='center'>
                <Box flexGrow={0} onClick={() => addProductToCart({ storeId, product })}>
                    <IconButton>
                        <AddBoxIcon />
                    </IconButton>
                </Box>

                <Box flex={1}>
                    <Typography align='center'>{quantity}</Typography>
                </Box>

                <Box flexGrow={0} onClick={() => decreaseProductQuantity({ storeId, productId })}>
                    <IconButton>
                        <IndeterminateCheckBoxIcon />
                    </IconButton>
                </Box>
                <Box flex={10}>
                    <Typography flex={3}>{name}</Typography>
                </Box>
                <Box flex={3}>
                    <Typography className={classes.price} align='right'>{formatCurrency(quantity * price)}</Typography>
                </Box>
            </Box >
            <AppDivider />
        </Fragment>

    )
}