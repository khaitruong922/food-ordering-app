import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import CategoryDashboard from "../dashboard/category/CategoryDashboard";
import MainDashboard from '../dashboard/main/MainDashboard';
import OrderDashboard from "../dashboard/order/OrderDashboard";
import DashboardSidebar from "../dashboard/sidebar/DashboardSideBar";
import StoreDashboard from "../dashboard/store/StoreDashboard";
import UserDashboard from "../dashboard/user/UserDashboard";
import StoreDetailDashboard from "./store/StoreDetailDashboard";

export default function DashboardRouter() {
    const { path, url } = useRouteMatch();
    return (
        <BrowserRouter>
            <Helmet title='Dashboard' />
            <Box h='100%'>
                <SimpleGrid columns={12} h='100%'>
                    <GridItem colSpan={[12, null, 3, 2]}>
                        <DashboardSidebar path={path} />
                    </GridItem>
                    <GridItem colSpan={[12, null, 9, 10]}>
                        <Switch>
                            <Route exact path={path} component={MainDashboard} />
                            <Route exact path={`${path}/users`} component={UserDashboard} />
                            <Route exact path={`${path}/stores`} component={StoreDashboard} />
                            <Route exact path={`${path}/stores/:id`} component={StoreDetailDashboard} />
                            <Route exact path={`${path}/stores`} component={StoreDashboard} />
                            <Route exact path={`${path}/orders`} component={OrderDashboard} />
                            <Route exact path={`${path}/categories`} component={CategoryDashboard} />
                        </Switch>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </BrowserRouter>
    )
}