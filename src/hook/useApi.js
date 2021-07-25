import { useEffect, useState } from 'react'
import api from '../api/api'

export default function useFetch({ endpoint, defaultValue = null }) {
    const [data, setData] = useState(defaultValue)
    const [error, setError] = useState('')
    const [loading, setloading] = useState(true)

    const fetchData = () => {
        api
            .get(endpoint)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setloading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    // custom hook returns value
    return { data, error, loading }
}