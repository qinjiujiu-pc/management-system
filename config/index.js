// config/index.js
export default {
    development: {
        baseUrl: '/api' // 开发代理地址
    },
    beta: {
        baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 测试接口域名
    },
    release: {
        baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 正式接口域名
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
            }
        }
    }
}