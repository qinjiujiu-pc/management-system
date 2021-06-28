import axios from 'axios'
import router from '@/router/index'
import config from '~/config'

import { ElMessage } from 'element-plus'
import { localGet } from './index'
// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = config[
        import.meta.env.MODE].baseUrl
    // 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
    // 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
    // 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers['token'] = localGet('token') || ''

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        // alert('服务端异常！')
        ElMessage.error('服务端异常！')
        return Promise.reject(res)


    }
    if (res.data.resultCode != 200) {
        if (res.data.message) ElMessage.error(res.data.message)
        if (res.data.resultCode == 419) {
            router.push({ path: '/login' })
        }
        return Promise.reject(res.data)
    }

    return res.data.data
})

export default axios