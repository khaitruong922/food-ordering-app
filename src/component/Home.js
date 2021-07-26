import { Box, Grid } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import * as React from 'react';
import StoreCard from "./store/StoreCard";
import useAuthStore from "../store/useAuthStore";
import useApi from "../hook/useApi";
import Spinner from "./shared/Spinner";
import { Helmet } from "react-helmet-async";

export default function Home() {
    const user = useAuthStore(state => state.user)
    const { data: stores, loading, error } = useApi({ endpoint: '/stores', defaultValue: [] })
    if (loading) return <Spinner />
    return (
        <Box width='80%' mx='auto' mt={2}>
            <Helmet title='DeliV' />
            <Grid
                container
                direction="row"
                justifyContent='flex-start'
                spacing={3}
            >
                {stores.map((store) => (
                    <Grid key={store.id} item xs={12} sm={6} md={4} lg={3} >
                        <StoreCard store={store} />
                    </Grid>
                ))}
            </Grid>
        </Box>

    )
}