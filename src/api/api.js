import axios from 'axios'

const isLocal = false
const url = isLocal ? 'http://localhost:3000' : 'https://foodorderingapp21.herokuapp.com'

const api = axios.create({
    baseURL: url,
    withCredentials: true,
})

export default api