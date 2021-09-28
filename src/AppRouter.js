import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CheckoutPage from "./component/checkout/CheckoutPage";
import DashboardRouter from "./component/dashboard/DashboardRouter";
import Home from "./component/home/Home";
import LoginPage from "./component/login/LoginPage";
import SignUpPage from "./component/login/SignUpPage";
import Error404Page from "./component/shared/Error404Page";
import MainAppBar from "./component/shared/MainAppBar";
import StorePage from "./component/store/StorePage";
import ProfilePage from "./component/profile/ProfilePage";
import useAuthStore from "./store/useAuthStore";

export default function AppRouter() {
    const user = useAuthStore(state => state.user)
    const isAdmin = user?.role === 'admin'
    return (
        <BrowserRouter>
            <Flex h='100%' direction='column'>
                <MainAppBar />
                <Box h='100%'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/profile'>
                            {user ? <ProfilePage /> : <Redirect to='/' />}
                        </Route>
                        <Route exact path='/login'>
                            {user ? <Redirect to='/' /> : <LoginPage />}
                        </Route>
                        <Route exact path='/register'>
                            {user ? <Redirect to='/' /> : <SignUpPage />}
                        </Route>
                        <Route path='/dashboard'>
                            {isAdmin ? <DashboardRouter /> : <Error404Page />}
                        </Route>
                        <Route exact path='/stores/:id'>
                            <StorePage />
                        </Route>
                        <Route exact path='/stores/:id/checkout'>
                            {user ? <CheckoutPage /> : <Redirect to='/login' />}
                        </Route>
                        <Route component={Error404Page} />
                    </Switch>
                </Box>
            </Flex>
        </BrowserRouter>
    )
}