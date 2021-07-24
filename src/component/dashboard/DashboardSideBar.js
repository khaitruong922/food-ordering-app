import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import dashboardItems from "./dashboardItems";

const drawerWidth = 300

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        position: 'relative',
        overflow: 'auto'
    },
    drawerPaper: {
        padding: 25,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        position: 'relative',
    },
    menuTitle: {
        fontWeight: 600,
    },
    listItemText: {
        fontWeight: 600,
    }
}))

function StyledListItem({ path, item }) {
    const classes = useStyles()
    return (
        <ListItem
            button
            component={Link}
            to={`${path}/${item.path}`}
            key={item.name}
        >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={<Typography className={classes.listItemText}>{item.name}</Typography>} />
        </ListItem>
    )

}

export default function DashboardSideBar({ path }) {
    const classes = useStyles()
    const items = dashboardItems
    return (
        <Drawer
            className={classes.drawer}
            anchor="left"
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
        >
            <List>
                {items.main.map(item => <StyledListItem path={path} item={item} />)}
            </List>
            <Typography className={classes.menuTitle}>Manage</Typography>
            <List>
                {items.manage.map(item => <StyledListItem path={path} item={item} />)}
            </List>
        </Drawer>
    )

}