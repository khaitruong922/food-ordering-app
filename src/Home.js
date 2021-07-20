import { Typography } from "@material-ui/core";
import useAuthStore from "./store/useAuthStore";

export default function Home() {
    const user = useAuthStore(state => state.user)
    return (
        <Typography>{user?.username}</Typography>
    )
}