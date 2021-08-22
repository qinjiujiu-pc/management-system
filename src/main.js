//规则都是先导入然后再引用 注意引用子组件的方法

import {
    createApp
} from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'

//下面两个都是导入element-plus样式
import ElementPlus from 'element-plus'
//这个是旧的样式 可以取消了
// import 'element-plus/lib/theme-chalk/index.css';
//导入自定义的主题包
import '../theme/index.css'
import {
    ElButton,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElFooter,
    ElMenu,
    ElSubmenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElForm,
    ElFormItem,
    ElInput,
    ElPopover,
    ElTag,
    ElCard,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDialog,
    ElPopconfirm,
    ElUpload,
    ElLoading,
    ElSelect,
    ElOption,
    ElRadioGroup,
    ElRadio,
    ElCascader,
    ElCheckbox,
    ElInputNumber
} from 'element-plus'

const app = createApp(App) // 生成 Vue 实例 app

app.use(router) // 引用路由实例
    //引入elementplus组件库
app.use(ElButton)
    .use(ElContainer)
    .use(ElAside)
    .use(ElHeader)
    .use(ElMain)
    .use(ElFooter)
    .use(ElMenu)
    .use(ElSubmenu)
    .use(ElMenuItemGroup)
    .use(ElMenuItem)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(ElPopover)
    .use(ElTag)
    .use(ElCard)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElPagination)
    .use(ElDialog)
    .use(ElPopconfirm)
    .use(ElUpload)
    .use(ElLoading)
    .use(ElSelect)
    .use(ElOption)
    .use(ElRadioGroup)
    .use(ElRadio)
    .use(ElCascader)
    .use(ElCheckbox)
    .use(ElInputNumber)


app.mount('#app') // 挂载到 #app
    // 全局方法
app.config.globalProperties.$filters = {
    prefix(url) {
        if (url && url.startsWith('http')) {
            // 当url以http开头的时候 我们返回原路径
            return url
        } else {
            // 否则我们会给路劲添加host
            url = 'http://backend-api-02.newbee.ltd${url}'
            return url
        }
    }
}
app.config.globalProperties.GoTop = function() {
        const main = document.querySelector('.main')
        main.scrollTop = 0
    }
    // Order.vue全局声明开始
const orderStatus = {
    0: '待支付',
    1: '已支付',
    2: '配货完成',
    3: '出库成功',
    4: '交易成功',
    '-1': '手动关闭',
    '-2': '超时关闭',
    '-3': '商家关闭'
}

// 全局方法
app.config.globalProperties.$filters = {
        orderMap(status) {
            return orderStatus[status] || '未知状态'
        },
        prefix(url) {
            if (url && url.startsWith('http')) {
                return url
            } else {
                url = `http://backend-api-02.newbee.ltd${url}`
                return url
            }
        }
    }
    // Order.vue全局声明结束