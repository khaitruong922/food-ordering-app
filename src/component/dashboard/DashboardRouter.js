import { Box, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import DashboardSidebar from "./DashboardSideBar";
import MainDashboard from './MainDashboard';
import StoreDashboard from "./StoreDashboard";
import UserDashboard from "./UserDashboard";

const useStyles = makeStyles(theme => ({

}))

export default function DashboardRouter() {
    const classes = useStyles()
    const { path, url } = useRouteMatch();
    return (
        <BrowserRouter>
            <Box display='flex' flexDirection='column'>
                <DashboardSidebar path={path} />
                <Box flexGrow={1}>
                    <Switch>
                        <Route exact path={path} component={MainDashboard} />
                        <Route path={`${path}/users`} component={UserDashboard} />
                        <Route path={`${path}/stores`} component={StoreDashboard} />
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    )
}