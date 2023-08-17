import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/layout/home.vue'
import Cart from '@/views/layout/cart.vue'
import Categorg from '@/views/layout/categorg.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'

const Login = () => import('@/views/login/index.vue')
const Search = () => import('@/views/search/index.vue')
const Pay = () => import('@/views/pay/index.vue')
const Myorder = () => import('@/views/myorder/index.vue')
const SearchList = () => import('@/views/search/list.vue')
const prodetail = () => import('@/views/prodetail/index.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children:
      [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/cart',
          component: Cart
        },
        {
          path: '/category',
          component: Categorg
        },
        {
          path: '/user',
          component: User
        }
      ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/myorder',
    component: Myorder
  },
  {
    path: '/prodetail/:id',
    component: prodetail
  }
]

const router = new VueRouter({
  routes
})

// 定义权限由数组
const authUrl = ['/pay', 'myorder']
router.beforeEach((to, from, next) => {
  // ...
  if (!authUrl.includes(to.path)) {
    next()
    return 0
  } else {
    // 判断是否有token权证
    if (store.getters.token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
