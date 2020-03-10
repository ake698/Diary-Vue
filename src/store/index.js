import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      username:window.localStorage.getItem("username"),
      token:window.localStorage.getItem("token"),
      avatar:window.localStorage.getItem("avatar"),
    },
    mutations: {
      login (state, form) {
        state.username = form.username
        state.token = form.token
        var avatarPath = "http://localhost:5000" + form.avatar
        state.avatar = avatarPath
        window.localStorage.setItem('username', form.username)
        window.localStorage.setItem('token', form.token)
        window.localStorage.setItem('avatar', avatarPath)
      },
      logout(state){
        state.username = ""
        state.token = ""
        state.avatar = ""
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("avatar")
      },
      avatarChange(state,avatar){
        var avatarPath = "http://localhost:5000" + avatar
        state.avatar = avatarPath
        window.localStorage.setItem('avatar', avatarPath)
      }
    }
  })

