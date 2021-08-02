import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from 'react';
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import useMessage from "../../../hook/useMessage";
import Spinner from "../../shared/Spinner";
import FormMessage from "../../styled-component/FormMessage";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '75ch',
        },
    },
    previewImage: {
        height: 200,
    },
    btn: {
        width: "auto"
    }
}))


export default function AddCategoryPage() {
    const classes = useStyles()
    const { value: name, onInput: onNameInput } = useInput('')
    const { message, success, setErrorMessage, setSuccessMessage } = useMessage()
    const [loading, setLoading] = useState(false)

    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await api.post('/categories', { name })
            setSuccessMessage('Create cateogry successfully!')
        } catch (e) {
            if (e.response.data.statusCode === 500) {
                setErrorMessage('Please provide a unique name!')
                return
            }
            const errorMessage = e.response.data.message[0]
            setErrorMessage(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' p={5}>
            <Typography variant='h4'>Add new category</Typography>
            <Box height={20}></Box>
            <form className={classes.root} onSubmit={onFormSubmit}>
                <Box display='flex' flexDirection='column'>
                    <TextField value={name} onInput={onNameInput} label="Name" required />
                    <Box height={20} />
                    <Box display='flex' justifyContent='center'>
                        <Button className={classes.btn} type="submit" variant="contained" color='secondary'>Submit</Button>
                    </Box>
                </Box>
            </form>
            <Box height={60} display='flex' alignItems='center' justifyContent='center'>
                {
                    loading ?
                        <Spinner color='secondary' /> :
                        <FormMessage success={success} content={message} />
                }
            </Box>
        </Box>
    )
}