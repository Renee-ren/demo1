import axios from 'axios'
const myaxios = {}
myaxios.install = function (Vue) {
  // 挂载统一的url路径
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
  // 设置统一的headers，判断是否具有token 拦截器
  axios.interceptors.request.use(function (config) {
    if (config.url !== '/login') {
      config.headers['Authorization'] = window.localStorage.getItem('token')
    }
    return config
  })
  Vue.prototype.$http = axios
}
export default myaxios
