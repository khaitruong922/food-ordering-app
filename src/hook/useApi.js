import { useEffect, useState } from 'react'
import api from '../api/api'

export default function useApi({ endpoint, defaultValue = null }) {
    const [data, setData] = useState(defaultValue)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [trigger, setTrigger] = useState(0)
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
                setLoading(false)
            })
    }

    useEffect(() => {
        if (!loading) return
        fetchData()
    }, [loading])

    useEffect(() => {
        if (trigger === 0) return
        fetchData()
    }, [trigger])

    // Use this to not trigger loading spinner on some pages
    function refresh() {
        setTrigger(trigger + 1)
    }

    // custom hook returns value
    return { data, error, loading, setData, refresh, setLoading }
}