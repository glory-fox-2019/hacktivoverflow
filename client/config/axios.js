import axios from 'axios'

// local host
// baseURL: 'http://localhost:3000'

const ax = axios.create({
    baseURL: 'http://35.185.176.226'
})

export default ax