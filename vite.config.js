// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

//  https://vitejs.dev/config/
// export default ({ mode }) => defineConfig({
//     plugins: [vue()],
//     resolve: {
//         alias: {
//             '~': path.resolve(__dirname, './'),
//             '@': path.resolve(__dirname, 'src')
//         },
//         extensions: ['.vue', '.js', 'jsx', '.json']
//     },
//     base: mode == 'development' ? './' : (mode == 'beta' ? '//s.baidu.com/beta/xxx' : '//s.baidu.com/release/xxx') // 静态资源路径配置
// })

// 上面的是原来没有改变之前的代码，为了区分编译环境和运行环境 需要做出改变，改变后代码如下。
// 当你打包代码的时候，index.html 文件内的静态资源引用路径是根据 vite.config.js 的 base 属性配置的。
// 如果我在发布的时候，使用的是在线静态资源 CDN 的形式，则需要做如下改动：
import {
    defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vitePluginImport from 'vite-plugin-babel-import'

// https://vitejs.dev/config/
export default ({
    mode
}) => defineConfig({
    plugins: [vue(),
        vitePluginImport([{
            libraryName: 'element-plus',
            libraryDirectory: 'es',
            style(name) {
                return `element-plus/lib/theme-chalk/${name}.css`;
            },
        }])

    ],
    //重点 配置跨域代理 配置 proxy 代理接口
    server: {
        proxy: {
            '/api': {
                target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
            }
        }
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.vue', '.js', 'jsx', '.json']
    },
    base: mode == 'development' ? './' : (mode == 'beta' ? '//s.baidu.com/beta/xxx' : '//s.baidu.com/release/xxx') // 静态资源路径配置

})