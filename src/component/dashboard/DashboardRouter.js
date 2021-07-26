import { Box, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import AddCategoryPage from '../dashboard/category/AddCategoryPage';
import CategoryDashboard from "../dashboard/category/CategoryDashboard";
import MainDashboard from '../dashboard/main/MainDashboard';
import OrderDashboard from "../dashboard/order/OrderDashboard";
import DashboardSidebar from "../dashboard/sidebar/DashboardSideBar";
import AddStorePage from "../dashboard/store/AddStorePage";
import StoreDashboard from "../dashboard/store/StoreDashboard";
import UserDashboard from "../dashboard/user/UserDashboard";
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
                        <Route exact path={`${path}/users`} component={UserDashboard} />
                        <Route exact path={`${path}/stores`} component={StoreDashboard} />
                        <Route exact path={`${path}/stores/add`} component={AddStorePage} />
                        <Route exact path={`${path}/stores`} component={StoreDashboard} />
                        <Route exact path={`${path}/orders`} component={OrderDashboard} />
                        <Route exact path={`${path}/categories`} component={CategoryDashboard} />
                        <Route exact path={`${path}/categories/add`} component={AddCategoryPage} />

                    </Switch>
                </Box>

            </Box>
        </BrowserRouter>
    )
}