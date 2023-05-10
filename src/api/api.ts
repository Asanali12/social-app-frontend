import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://51.250.107.137:8000/',
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json',
        'accept' : 'application/json'
    }
})

export default instance
