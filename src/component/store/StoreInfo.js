import * as React from 'react';
import {
    Box, CardMedia, Typography, Card, Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    storeCard: {
        borderRadius: theme.btn.borderRadius,
        backgroundColor: theme.palette.grey.main,
        height: 320,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9 56.25,
    },
    content: {
        alignItems: 'center'
    },
    link: {
        textDecoration: theme.link.textDecoration,
        color: theme.palette.primary.contrastText
    }
}))
export default function StoreInfo({ store }) {
    const classes = useStyles()
    const { id, name, address, description, image } = store
    const imageUrl = image?.url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    return (
        <Box containter="true" justifyContent='center' mx='10px' my="10px">
            <Card className={classes.storeCard} >
                <CardMedia className={classes.media} image={imageUrl} title={name} />
                <Box display='flex' justifyContent='center'>
                    <Typography variant='h6' gutterBottom>
                        {name}
                    </Typography>
                </Box>
                <Box mx='10px' display='flex' justifyContent='center' flexDirection='column'>
                    <Typography align='center' variant='subtitle2' gutterBottom>
                        {address}
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}