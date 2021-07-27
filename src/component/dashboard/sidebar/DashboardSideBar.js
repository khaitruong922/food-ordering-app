import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import dashboardItems from "./dashboardItems";


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
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
        <Box className={classes.root} height='100%' p={2} display='flex' flexDirection='column'>
            <List>
                {items.main.map(item => <StyledListItem key={item.name} path={path} item={item} />)}
            </List>
            <Typography className={classes.menuTitle}>Manage</Typography>
            <List>
                {items.manage.map(item => <StyledListItem key={item.name} path={path} item={item} />)}
            </List>
        </Box>
    )

}