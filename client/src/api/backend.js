import axios from 'axios'

const backend = axios.create({
  baseURL: `http://ec2-3-19-76-11.us-east-2.compute.amazonaws.com:3000`
})

export default backend