import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import formatCurrency from "../../util/formatCurrency"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import mockProductImage from "../../mock/mockProductImage";
const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
        height: 100,
        objectFit: 'cover'
    },
    name: {
        fontWeight: 700,
        fontSize: 20
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
    const { id, name, price, description, image } = product || {}
    const { url: imageUrl } = image || mockProductImage
    return (
        <Box display='flex' flexDirection='row' boxShadow={1} p={2} height='100%'>
            <Box flex={2} display='flex' alignItems='center'>
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