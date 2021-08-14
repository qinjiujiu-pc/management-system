// router/index.js
import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
//导入路由的时候不要使用@语法 直接输入地址
import Index from '../views/Index.vue'
// 导入添加商品页面vue
import AddGood from '@/views/AddGood.vue'
// 登录页面的路由导入
import Login from '@/views/Login.vue'

const router = createRouter({
    history: createWebHashHistory(), // hash 模式
    routes: [
        // index首页路由声明
        {
            path: '/',
            name: 'index',
            component: Index
        },
        // AddGood添加商品路由声明
        {
            path: '/add',
            // 这里的地址是显示在浏览器窗口中的  所以可以简化成为add
            //name是便于获取参数
            name: 'add',
            component: AddGood

        },
        // 登录页面的路由配置
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

export default router