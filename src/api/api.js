import axios from 'axios'

const isLocal = false
const url = isLocal ? 'http://localhost:3000' : 'https://deli-v.herokuapp.com'

const api = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: { crossDomain: true, 'Content-Type': 'application/json' },
})

export default api

export const setHeaderToken = (accessToken) => api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`