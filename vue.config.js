/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-15 20:27:07
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-16 13:28:56
 * @FilePath: /basic-project/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
/**
 * @param dir {String}
 * @returns {String}
 * */
function resolve(dir) {
    return path.join(__dirname, './', dir);
}
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    lintOnSave: false,
    devServer: {
        // 配置代理
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://localhost:8080`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        // before: require('./mock/mock-server.js'),
        before(app) {
            // 根据你的url规则来定
            app.all('/mock-api/*', (req, res) => {
                // 根据你的json数据地址来适配，是否和请求url完全一致
                const url = req.path.replace('/mock-api/', '');
                // json数据
                const filePath = `src/mock/data/${url}.json`;
                // json数据绝对地址
                const abPath = resolve(filePath);
                const data = require(abPath);
                res.json(data);
            })
        }
    },
    // webpack配置
    configureWebpack: {
        devtool: 'source-map',
        // 配置模块解析
        resolve: {
            alias: {
                '@': resolve('src'),
                '@assets': resolve('src/assets')
            }
        }
    },
    // 配置scss文件全局变量
    css: {
        loaderOptions: {
            // 没有分号会报错
            sass: {
                // data: '@import "@/assets/css/vars.scss";' //旧版sass-loader写法(8.0以下)
                prependData: `@import "~@/assets/styles/var.scss";` //新版scss-loader(8.0及以上)
            }
        }
    },
}