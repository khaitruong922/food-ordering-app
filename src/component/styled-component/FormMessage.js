import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => (
    {
        txt: {
            fontWeight: 500,
        },
        success: {
            fontWeight: 500,
            color: theme.palette.success.main
        }
    }
))

export default function FormMessage({ content = '', success = false }) {
    const classes = useStyles()
    if (success) return (<Typography align='center' className={classes.success} color='success'>{content}</Typography>)
    return (<Typography align='center' className={classes.txt} color='error'>{content}</Typography>)
}