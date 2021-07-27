import { Box, Grid } from "@material-ui/core";
import * as React from 'react';
import { Helmet } from "react-helmet-async";
import useApi from "../../hook/useApi";
import useAuthStore from "../../store/useAuthStore";
import Spinner from "../shared/Spinner";
import StoreCard from "./StoreCard";

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