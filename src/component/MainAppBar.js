import { AppBar, Box, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => (
  {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      height: 64,
    },
    btn: {
      color: theme.palette.primary.contrastText,

    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText
    }
  })
)

function AppBarItems() {
  const classes = useStyles()
  const user = useAuthStore(state => state.user)
  const isAdmin = user?.role === 'admin'
  const history = useHistory()
  const logout = useAuthStore(state => state.logout)
  if (user) return (
    <Fragment>
      {
        isAdmin && <IconButton component={Link} to='/dashboard'><DashboardIcon color='secondary' /></IconButton>
      }
      <IconButton onClick={() => {
        logout()
        history.push('/')
      }} className={classes.btn}><ExitToAppIcon /></IconButton>
    </Fragment>
  )
  return (
    <Fragment>
      <Button component={Link} to='/login' className={classes.btn}>Login</Button>
    </Fragment>
  )
}

export default function MainAppBar() {
  const classes = useStyles()
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <AppBar position='sticky' className={classes.appBar}>
        <Toolbar>
          <Link className={classes.link} to="/"><Typography variant='h6'>DeliV</Typography></Link>
          <Box display='flex' justifyContent='center' ml='auto'>
            <AppBarItems />
          </Box>
        </Toolbar>
      </AppBar>
    </Box >
  )
}