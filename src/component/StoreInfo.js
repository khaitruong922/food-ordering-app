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
const StoreInfo = ({storeItem}) => {
    const [state, setState] = React.useState({
        visible: false
    })
    const classes = useStyles()
    return (
        <Box containter justifyContent='center' mx='10px' my="10px">
                    <Card className={classes.storeCard} >
                        <CardMedia className={classes.media} image={storeItem.image} title={storeItem.name} />
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h6' gutterBottom>
                                {storeItem.name}
                            </Typography>
                        </Box>
                        {state.visible ?
                            <Box mx='10px' display='flex' justifyContent='center' flexDirection='column'>
                                <Typography align='center' variant='h7' gutterBottom>
                                    {storeItem.address}
                                </Typography>
                            </Box>
                            : null}

                        {state.visible ?
                            <Box display='flex' justifyContent='center'>
                                <Button className={classes.btn} onClick={() => { setState({ visible: false }) }}>Hide Detail</Button>
                            </Box>
                            : 
                            <Box display='flex' justifyContent='center'>
                                <Button className={classes.btn} onClick={() => { setState({ visible: true }) }} >View More Detail</Button>
                            </Box>
                        }
                    </Card>
                </Box>
    )
}

export default StoreInfo
