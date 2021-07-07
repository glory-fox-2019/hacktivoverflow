import axios from 'axios'

const instance = axios.create({
    baseURL: `http://35.247.148.198`
})

export default instance