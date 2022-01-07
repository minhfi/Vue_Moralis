import Vue from 'vue'
import VueRouter from 'vue-router'
import SendETHPayment from '../views/SendETHPayment'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/send-eth-payment',
    name: 'SendETHPayment',
    component: SendETHPayment
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
