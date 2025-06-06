import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
})

export default instance;