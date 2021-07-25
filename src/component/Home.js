import { Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import * as React from 'react';
import StoreInfo from "./store/StoreInfo";
import useAuthStore from "../store/useAuthStore";
import useApi from "../hook/useApi";

const stores = [
    { id: 1, name: 'KFC Store', address: '123 Nam Ky Khoi Nghia, Q.1, TP. Ho Chi Minh', description: 'No Description1', image: 'https://images.foody.vn/res/g3/25271/prof/s576x330/image-1c4f1a69-201123110756.jpeg' },
    { id: 2, name: 'McDonald Store', address: '103 Hai Ba Trung, Q.1, TP. Ho Chi Minh', description: 'No Description2', image: 'https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2019_11_04/mc_iupz.jpg' },
    { id: 3, name: 'Lotteria Store', address: '45 Phan Van Tri, Q.Binh Thanh, TP. Ho Chi Minh', description: 'No Description3', image: 'https://images.foody.vn/res/g10/91503/prof/s576x330/image-0b926573-210614102941.jpeg' },
    { id: 4, name: 'An Nam Gourmet Store', address: '18 Hai Ba Trung, Q.1, TP. Ho Chi Minh', description: 'No Description4', image: 'https://images.foody.vn/res/g67/667394/prof/s640x400/foody-upload-api-foody-mobile-untitled-1-recovered-200410150104.jpg' },
    { id: 5, name: 'Gogi House', address: '198 Phan Xich Long, Q.Phu Nhuan, TP. Ho Chi Minh', description: 'No Description5', image: 'https://static.muanhanh.com/images/2019/10/05/09655444fc49426547a2e40238ec67c5.jpg' },
    { id: 6, name: 'Lotteria Store', address: '38 Mac Dinh Chi, Q.1, TP. Ho Chi Minh', description: 'No Description6', image: 'https://vincom.com.vn/sites/default/files/2016-09/King-BBQ-vua-nuong-han-quoc_7.png' }
]

export default function Home() {
    const user = useAuthStore(state => state.user)
    const { data: stores, loading, error } = useApi({ endpoint: '/stores', defaultValue: [] })
    return (
        <Box container="true" justifyContent='center' mx='auto' mt={3} width={1350} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, backgroundColor: grey[200], borderRadius: '20px' }}>
            {stores.map((store) => (
                <StoreInfo key={store.id} store={store} />
            ))}
        </Box>
    )
}