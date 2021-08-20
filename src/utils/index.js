export function localGet(key) {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } finally {
        // 这里出现了一个报错 所以才添加了finally  如果后期出现问题的话 把这里删除

    }
}
export function localSet(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove(key) {
    window.localStorage.removeItem(key)
}
export const pathMap = {
        index: '首页',
        login: '登录',
        add: '添加商品',
        swiper: '轮播图配置',
        hot: '热销商品配置',
        new: '新品上线配置',
        recommend: '为你推荐配置',
    }
    // 单张图片上传 
    // 这个就是导致上一个错误的原因 未定义啥啥的
export const uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'