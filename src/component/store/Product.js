import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import formatCurrency from "../../util/currencyFormatter"
import AddCircleIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
        height: 100,
        objectFit: 'cover'
    },
    name: {
        fontWeight: 700,
        fontSize: 24
    },
    price: {
        fontWeight: 600,
    },
    description: {
        fontSize: 12,
    }
}))

export default function Product({ product }) {
    const classes = useStyles()
    const { id, name, price, description, image: { url: imageUrl } = {} } = product || {}
    return (
        <Box display='flex' flexDirection='row' m={2}>
            <Box flex={2}>
                <img className={classes.image} src={imageUrl}></img>
            </Box>
            <Box flex={4} ml={2}>
                <Typography className={classes.name} >{name}</Typography>
                <Typography className={classes.price}>{formatCurrency(price)}</Typography>
                <Typography className={classes.description}>{description}</Typography>
            </Box>
            <Box flex={1} ml={2} alignSelf='flex-end'>
                <IconButton><AddCircleIcon color='secondary' /></IconButton>
            </Box>
        </Box>
    )
}