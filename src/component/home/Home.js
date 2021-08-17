import { Box, SimpleGrid } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import useApiGet from "../../hook/useApiGet";
import useAuthStore from "../../store/useAuthStore";
import LoadingSpinner from "../shared/LoadingSpinner";
import StoreCard from "./StoreCard";

export default function Home() {
    const user = useAuthStore(state => state.user)
    const { data: stores, loading, error } = useApiGet({ endpoint: '/stores', defaultValue: [] })
    if (loading) return <LoadingSpinner />
    return (
        <Box width='80%' mx='auto' mt={2}>
            <Helmet title='DeliV' />
            <SimpleGrid
                columns={[1, 2, 3, 4]}
                spacing={3}
            >
                {stores.map((store) => (
                    <StoreCard key={store.id} store={store} />
                ))}
            </SimpleGrid>
        </Box>

    )
}