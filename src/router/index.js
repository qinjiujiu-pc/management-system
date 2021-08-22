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

import Swiper from '@/views/Swiper.vue'
import IndexConfig from '@/views/IndexConfig.vue'
import Category from '@/views/Category.vue'
import Good from '@/views/Good.vue'
import Order from '@/views/Order.vue'
import OrderDetail from '@/views/OrderDetail.vue'
import Guest from '@/views/Guest.vue'

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
        },
        {
            path: '/swiper',
            name: 'swiper',
            component: Swiper
        },
        {
            path: '/hot',
            name: 'hot',
            component: IndexConfig
        },
        {
            path: '/new',
            name: 'new',
            component: IndexConfig
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: IndexConfig
        },
        // 分类管理页面配置
        {
            path: '/category',
            name: 'category',
            component: Category,
            children: [{
                    path: '/category/level2',
                    name: 'level2',
                    component: Category,
                },
                {
                    path: '/category/level3',
                    name: 'level3',
                    component: Category,
                },

            ]
        },
        // 商品管理页面
        {
            path: '/good',
            name: 'good',
            component: Good
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/order_detail',
            name: 'order_detail',
            component: OrderDetail
        },

        // 会员管理页面
        {
            path: '/guest',
            name: 'guest',
            component: Guest
        }



    ]
})

export default router