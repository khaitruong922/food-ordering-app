import { Box, Grid, makeStyles, Typography } from "@material-ui/core"
import Product from "./Product"

const useStyles = makeStyles((theme) => ({
    grid: {
        flexGrow: 1
    }
}))

export default function ProductMenu({ menu }) {
    const { id, name = 'Menu', products = [] } = menu
    const classes = useStyles()
    return (
        <Box p={2}>
            <Typography variant='h6'>{name}</Typography>
            <Box height={10} />
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} md={6} lg={4} >
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid >
        </Box>
    )
}