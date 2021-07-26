import { Box } from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import DashboardRouter from "./component/dashboard/DashboardRouter";
import LoginPage from "./component/login/LoginPage";
import MainAppBar from "./component/shared/MainAppBar";
import SignUpPage from "./component/login/SignUpPage";
import Home from "./component/Home";
import Error404Page from "./component/shared/Error404Page";
import useAuthStore from "./store/useAuthStore";
import StorePage from "./component/store/StorePage";

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
                        <Route exact path='/login'>
                            {user ? <Redirect to='/' /> : <LoginPage />}
                        </Route>
                        <Route exact path='/signup'>
                            {user ? <Redirect to='/' /> : <SignUpPage />}
                        </Route>
                        <Route exact path='/dashboard'>
                            {isAdmin ? <DashboardRouter /> : <Error404Page />}
                        </Route>
                        <Route exact path='/stores/:id'>
                            <StorePage />
                        </Route>
                        <Route component={Error404Page} />
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    )
}