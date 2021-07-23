import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import StoreIcon from '@material-ui/icons/Store';
import { Link, useRouteMatch } from 'react-router-dom';

const drawerWidth = 300

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        position: 'relative',
        height: '100vh',
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

export default function DashboardSideBar({ path }) {
    const classes = useStyles()
    const items = [
        {
            name: 'Users',
            icon: <PeopleIcon color="secondary" />,
            path: 'users'
        },
        {
            name: 'Stores',
            icon: <StoreIcon color="secondary" />,
            path: 'stores'
        }
    ]
    return (
        <Drawer
            className={classes.drawer}
            anchor="left"
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
        >
            <ListItem
                button
                component={Link}
                to={`${path}`}
                key='Dashboard'
            >
                <ListItemIcon><DashboardIcon color='secondary' /></ListItemIcon>
                <ListItemText primary={<Typography className={classes.listItemText}>Dashboard</Typography>} />
            </ListItem>
            <Typography className={classes.menuTitle}>Manage</Typography>
            <List>
                {
                    items.map(item => (
                        <ListItem
                            button
                            component={Link}
                            to={`${path}/${item.path}`}
                            key={item.name}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={<Typography className={classes.listItemText}>{item.name}</Typography>} />
                        </ListItem>
                    ))
                }

            </List>
        </Drawer>
    )

}