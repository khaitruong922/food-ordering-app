import { Box, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import CategoryDashboard from "../dashboard/category/CategoryDashboard";
import DashboardSidebar from "../dashboard/sidebar/DashboardSideBar";
import MainDashboard from '../dashboard/main/MainDashboard';
import OrderDashboard from "../dashboard/order/OrderDashboard";
import StoreDashboard from "../dashboard/store/StoreDashboard";
import UserDashboard from "../dashboard/user/UserDashboard";
import AddStorePage from "../dashboard/store/AddStorePage";
import AddCategoryPage from '../dashboard/category/AddCategoryPage'
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