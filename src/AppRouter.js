import { Box } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardRouter from "./component/dashboard/DashboardRouter";
import LoginPage from "./component/LoginPage";
import MainAppBar from "./component/MainAppBar";
import SignUpPage from "./component/SignUpPage";
import Home from "./Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Box height='100%' display='flex' flexDirection='column'>
                <MainAppBar />
                <Box height='100%'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/signup' component={SignUpPage} />
                        <Route path='/dashboard' component={DashboardRouter} />
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    )
}