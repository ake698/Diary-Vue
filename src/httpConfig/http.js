// import axios from 'axios'
import store from '../store/index'
//为每个请求添加一个token
var axios = require('axios')
axios.interceptors.request.use(config =>{
  if(store.state.token){
    config.headers.common["Authorization"] = "Bearer " + store.state.token
    //axios.defaults.headers.common['Authentication'] = store.state.token;
  }
  return config;
},error =>{
  return Promise.reject(error)
})

/* 响应拦截器 */
axios.interceptors.response.use(function (response) {
  // console.log(response.data)
    return response
}, function (error) {
    var code = error.response.status
    if(code===401){
      window.location.href=  "/login"
    }
    return Promise.reject(error)
})
export default axios;
