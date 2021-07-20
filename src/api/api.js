import axios from 'axios'

const isLocal = false
const url = isLocal ? 'http://localhost:3000' : 'https://deli-v.herokuapp.com'

const api = axios.create({
    withCredentials: true,
    baseURL: url,
})

export default api

export const setHeaderToken = (accessToken) => api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`