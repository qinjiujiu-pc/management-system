//规则都是先导入然后再引用 注意引用子组件的方法

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
//下面两个都是导入element-plus样式
import ElementPlus from 'element-plus'
//这个是旧的样式 可以取消了
// import 'element-plus/lib/theme-chalk/index.css';
//导入自定义的主题包
import '../theme/index.css'
import { ElButton, ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElMenu, ElSubmenu, ElMenuItemGroup, ElMenuItem, ElForm, ElFormItem, ElInput, ElPopover, ElTag, ElCard, ElTable, ElTableColumn, ElPagination, ElDialog, ElPopconfirm, ElUpload, ElLoading, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCascader, ElCheckbox, ElInputNumber } from 'element-plus'

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