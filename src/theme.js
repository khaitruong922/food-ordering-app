import { grey, red, yellow } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: grey[800],
            contrastText: "#fff",
            light: grey[700],
        },
        secondary: {
            main: yellow[500],
            dark: yellow[700],
        },
        error: {
            main: red[300]
        }
    },
    typography: {
        fontFamily: [
            '"Helvetica Neue"',
            '-apple-system',
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
})