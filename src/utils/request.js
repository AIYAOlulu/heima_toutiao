import axios from 'axiao'
const request = axios.create({
  baseURL: 'https://toutiao.itheima.net',
  timeout: 3000
})
export default request
