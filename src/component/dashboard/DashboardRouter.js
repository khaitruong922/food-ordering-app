import { Box, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import CategoryDashboard from "./CategoryDashboard";
import DashboardSidebar from "./sidebar/DashboardSideBar";
import MainDashboard from './MainDashboard';
import OrderDashboard from "./order/OrderDashboard";
import StoreDashboard from "./store/StoreDashboard";
import UserDashboard from "./user/UserDashboard";

const useStyles = makeStyles(theme => ({

}))

export default function DashboardRouter() {
    const classes = useStyles()
    const { path, url } = useRouteMatch();
    return (
        <BrowserRouter>
            <Box display='flex' height='100%'>
                <DashboardSidebar path={path} />
                <Box flexGrow={1}>
                    <Switch>
                        <Route exact path={path} component={MainDashboard} />
                        <Route path={`${path}/users`} component={UserDashboard} />
                        <Route path={`${path}/stores`} component={StoreDashboard} />
                        <Route path={`${path}/orders`} component={OrderDashboard} />
                        <Route path={`${path}/categories`} component={CategoryDashboard} />
                    </Switch>
                </Box>

            </Box>
        </BrowserRouter>
    )
}