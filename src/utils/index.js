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
    add: '添加商品'
}