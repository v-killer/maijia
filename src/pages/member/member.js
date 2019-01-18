import './member.css'

// 1. 使用vue-router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [{
    path: '/',
    component: () => import('./components/member.vue')
},{
    path: '/address',
    component: ()=> import('./components/address.vue'),
    children:[{
        path: '',
        component: () => import('./components/all.vue'),
        redirect: 'all'
    },{
        path: 'all',
        name: 'all',
        component: () => import('./components/all.vue')
    },{
        path: 'form',
        name: 'form',
        component: () => import('./components/form.vue')
    }]
}]

//创建router实例
let router = new Router({
    routes
})

// 根组件注入
new Vue({
    el: '#app',
    router
})