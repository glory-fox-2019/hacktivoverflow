import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://35.240.149.181'
})

export default instance
