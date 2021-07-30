import { useState } from "react";

export default function useMessage() {
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    function setErrorMessage(content) {
        setMessage(content)
        setSuccess(false)
    }
    function setSuccessMessage(content) {
        setMessage(content)
        setSuccess(true)
    }
    return { message, success, setErrorMessage, setSuccessMessage }
}