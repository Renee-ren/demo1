import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'

import Home from '@/components/page/home.vue'
import Users from '@/components/page/users/users.vue'
import Rights from '@/components/page/rights/rights.vue'
import Roles from '@/components/page/roles/roles.vue'
import Goods from '@/components/page/goods/goods.vue'
import Add from '@/components/page/goods/add.vue'
import Cate from '@/components/page/cate/cate.vue'

import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          // 將users路由註冊為home的子路由
          path: '/users',
          name: 'users',
          component: Users
        }, {
          // 將rights路由註冊為home的子路由
          path: '/rights',
          name: 'rights',
          component: Rights
        }, {
          // 將roles路由註冊為home的子路由
          path: '/roles',
          name: 'roles',
          component: Roles
        }, {
          // 將roles路由註冊為home的子路由
          path: '/goods',
          name: 'goods',
          component: Goods
        }, {
          // 將roles路由註冊為home的子路由
          path: '/goods/add',
          name: 'add',
          component: Add
        },{
          // 將roles路由註冊為home的子路由
          path: '/categories',
          name: 'categories',
          component: Cate
        }
      ]
    }
  ]
})
router.beforeEach((to, form, next) => {
  if (to.path !== '/login') {
    let token = window.localStorage.getItem('token')
    if (!token) {
      Message.error('未登录，请先登录')
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
