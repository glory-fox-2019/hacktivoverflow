import axios from 'axios'

const ax = axios.create({
  baseURL: 'http://3.1.220.242/',
  headers: {
    'access_token': localStorage.getItem('access_token')
  }
})

export default ax
