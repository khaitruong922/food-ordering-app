import { Box } from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import DashboardRouter from "./component/dashboard/DashboardRouter";
import LoginPage from "./component/LoginPage";
import MainAppBar from "./component/MainAppBar";
import SignUpPage from "./component/SignUpPage";
import Home from "./component/Home";
import Error404Page from "./component/Error404Page";
import useAuthStore from "./store/useAuthStore";

export default function AppRouter() {
    const user = useAuthStore(state => state.user)
    const isAdmin = user?.role === 'admin'
    return (
        <BrowserRouter>
            <Box height='100%' display='flex' flexDirection='column'>
                <MainAppBar />
                <Box height='100%'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/login'>
                            {user ? <Redirect to='/' /> : <LoginPage />}
                        </Route>
                        <Route path='/signup'>
                            {user ? <Redirect to='/' /> : <SignUpPage />}
                        </Route>
                        <Route path='/dashboard'>
                            {isAdmin ? <DashboardRouter /> : <Error404Page />}
                        </Route>
                        <Route component={Error404Page} />
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    )
}