import { AppBar, Box, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => (
  {
    bar: {
      backgroundColor: theme.palette.primary.main,
      flexGrow: 1
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
export default function NavBar() {
  const classes = useStyles()
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link className={classes.link} to="/"><Typography variant='h6'>DeliV</Typography></Link>
          <Box display='flex' justifyContent='center' ml='auto'>
            <Link to="/login" className={classes.link}><Button className={classes.btn}>Login</Button></Link>
            <Link to="/signup" className={classes.link}><Button className={classes.btn}>Sign up</Button></Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}