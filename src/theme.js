import { amber, green, grey, red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: grey[800],
            contrastText: "#fff",
            light: grey[700],
        },
        secondary: {
            main: amber[700],
            dark: amber[900],
            contrastText: "#fff"
        },
        grey: {
            main: grey[700]
        },
        error: {
            main: red[600]
        },
        success: {
            main: green[600]
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            '"Helvetica Neue"',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    btn: {
        borderRadius: '20px',
    },
    link: {
        textDecoration: "none",
    },

})