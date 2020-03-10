import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect:"/login",
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: ()=> import('../components/Login'),
      meta:{
        title:'登陆页面'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: ()=> import('../components/Register'),
      meta:{
        title:'注册页面'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: ()=> import('../components/Home'),
      meta:{
        "requireAuth":true
      },
      children:[
        {
          path: '/index',
          name: 'index',
          component: ()=> import('../components/Index'),
          meta:{
            "requireAuth":true
          },
        },
        {
          path: '/mydiary',
          name: 'Mydiary',
          component: ()=> import('../components/MyDiary'),
          meta:{
            "requireAuth":true
          },
        },
        {
          path: '/manager',
          name: 'Manager',
          component: ()=> import('../components/Manager'),
          meta:{
            "requireAuth":true
          },
        },
        {
          path: '/diary',
          name: 'Diary',
          component: ()=> import('../components/Diary'),
          meta:{
            "requireAuth":true
          },
        },
        {
          path: '/about',
          name: 'About',
          component: ()=> import('../components/About'),
          meta:{
            "requireAuth":true
          },
        },
      ]
    },

    {
      path: '/action',
      name: 'action',
      component: ()=> import('../components/Action'),
      meta:{
        "requireAuth":true
      },
    },
    // {
    //   path: '/dairy',
    //   name: 'Dairy',
    //   component: ()=> import('../components/Dairy')
    // },
  ]
})
