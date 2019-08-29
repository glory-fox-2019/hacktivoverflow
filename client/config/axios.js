import axios from 'axios'

// local host
// baseURL: 'http://localhost:3000'

const ax = axios.create({
    baseURL: 'http://localhost:3000'
})

export default ax