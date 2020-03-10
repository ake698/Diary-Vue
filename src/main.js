// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import App from './App'
import router from './router'
import store from './store'
import axios from './httpConfig/http'
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:5000'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

//请求拦截器 拦截每个需要验证的页面
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    console.log("dd")
    next()
  }
}
)



Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //传递store
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
