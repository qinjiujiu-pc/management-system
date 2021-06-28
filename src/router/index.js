// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
//导入路由的时候不要使用@语法 直接输入地址
import Index from '../views/Index.vue'

const router = createRouter({
    history: createWebHashHistory(), // hash 模式
    routes: [{
        path: '/',
        component: Index
    }]
})

export default router