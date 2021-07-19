import { AppBar, Button, Toolbar, Typography, IconButton, Box, Link} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(
  {
    bar:{
      backgroundColor: '#669999',
      flexGrow: 1
    },
    title:{
      flexGrow:1,
      textDecoration: 'none',
    },
    text:{
      color : '#ffffff',
      textDecoration: 'none',
      variant: "h6",
      '&:hover':{
        textDecoration: 'none',
      }
    },
    lgin_btn: {
      backgroundColor: '#ffbdc7',
      borderRadius: '10px',
      padding: "6px 20px",
      '&:hover':{
        backgroundColor: '#ffcad2'
    }
    },
    sgup_btn:{
      backgroundColor: ' #ffcf9e',
      borderRadius: '10px',
      padding: "6px 20px",
      '&:hover':{
        backgroundColor: '#ffdebd'
    }
    },

  }
)
export default function NavBar() {
  const classes = useStyles()
    return (
        <AppBar>
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} >
            <Link className={classes.text} href="/">Food Order Application</Link>
          </Typography>
          <Button variant="contained" href="/login" className={classes.lgin_btn}>Login</Button>
          <Box width='10px'></Box>
          <Button variant="contained" href="/signup" className={classes.sgup_btn}>Sign Up</Button>
          
          
        </Toolbar>
      </AppBar>


    )
}