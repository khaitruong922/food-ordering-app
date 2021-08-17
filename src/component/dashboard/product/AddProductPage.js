import { Box, Button, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import useInput from "../../../hook/useInput";
import useMessage from "../../../hook/useMessage";
import isValidImageFile from "../../../util/isValidImageFile";
import LoadingSpinner from "../../shared/LoadingSpinner";
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
    },
    priceInput: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        }
    },
}))


export default function AddProductPage() {
    const classes = useStyles()
    const { id: menuId } = useParams()
    const { value: name, onInput: onNameInput } = useInput('')
    const { value: price, onInput: onPriceInput } = useInput('')
    const { value: description, onInput: onDescriptionInput } = useInput('')
    const { message, success, setErrorMessage, setSuccessMessage } = useMessage()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    async function onFormSubmit(e) {
        e.preventDefault()
        const _price = Number(price)
        if (_price === NaN) {
            setErrorMessage('Please enter a number for price')
            return
        }
        if (_price < 0) {
            setErrorMessage(`Price can't be negative!`)
            return
        }
        try {
            setLoading(true)
            const { data } = await api.post(`/sub-menus/${menuId}/products`, { name, price: _price, description })
            const { id } = data
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                await api.post(`/products/${id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
            setSuccessMessage('Add product successfully!')
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
        <Box display='flex' flexDirection='column' alignItems='center' p={5}>
            <Typography variant='h4'>Add product</Typography>
            <Box height={20}></Box>
            <form className={classes.root} onSubmit={onFormSubmit}>
                <Box display='flex' flexDirection='column'>
                    <TextField value={name} onInput={onNameInput} label="Name" required />
                    <TextField className={classes.priceInput} type='number' min={0} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, }}
                        value={price} onInput={onPriceInput} label="Price" required />
                    <TextField value={description} onInput={onDescriptionInput} label="Description" multiline rows={4} />
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
                        <LoadingSpinner /> :
                        <FormMessage success={success} content={message} />
                }
            </Box>
        </Box>
    )
}