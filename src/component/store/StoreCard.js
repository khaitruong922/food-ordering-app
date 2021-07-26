import {
    Box, makeStyles, Typography
} from "@material-ui/core";
import * as React from 'react';
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    },
    address: {
        color: theme.palette.grey.main
    }
}))
export default function StoreCard({ store }) {
    const classes = useStyles()
    const { id, name, address, description, image } = store
    const imageUrl = image?.url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    return (
        <Box justifyContent='center' boxShadow={1} borderRadius={1} p={3}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/stores/${id}`}>
                <img alt={name} className={classes.img} src={imageUrl}></img>
                <Typography noWrap variant='h6'>{name}</Typography>
                <Typography noWrap className={classes.address} variant='subtitle2'>{address}</Typography>
            </Link>
        </Box>
    )
}