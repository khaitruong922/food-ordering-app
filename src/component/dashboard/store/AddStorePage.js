import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from 'react';
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import useMessage from "../../../hook/useMessage";
import isValidImageFile from "../../../util/isValidImageFile";
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


export default function AddStorePage() {
    const classes = useStyles()
    const { value: name, onInput: onNameInput } = useInput('')
    const { value: address, onInput: onAddressInput } = useInput('')
    const { value: description, onInput: onDescriptionInput } = useInput('')
    const { message, success, setErrorMessage, setSuccessMessage } = useMessage()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await api.post('/stores', { name, address, description })
            const { id } = data
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                await api.post(`/stores/${id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
            setSuccessMessage('Create store successfully!')
        } catch (e) {
            const errorMessage = e.response.data.message[0]
            setErrorMessage(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    function onFileChange(e) {
        const file = e.target.files[0]
        const { valid, message } = isValidImageFile(file)
        if (!valid) {
            setErrorMessage(message)
            setFile(null)
            e.target.value = null
            return
        }
        setErrorMessage('')
        setFile(file)
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' p={4}>
            <Typography variant='h4'>Add new store</Typography>
            <Box height={20}></Box>
            <form className={classes.root} onSubmit={onFormSubmit}>
                <Box display='flex' flexDirection='column'>
                    <TextField value={name} onInput={onNameInput} label="Name" required />
                    <TextField value={address} onInput={onAddressInput} label="Address" required />
                    <TextField value={description} onInput={onDescriptionInput} label="Description" multiline rows={4} required />
                    <Typography variant='subtitle2'>Image</Typography>
                    <Box height={10} />
                    <input type="file" onChange={onFileChange} />
                    <Box height={10} />
                    <Box display='flex' alignItems='center' flexDirection='column'>
                        <img className={classes.previewImage} src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : null} />
                        <Box height={20} />
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