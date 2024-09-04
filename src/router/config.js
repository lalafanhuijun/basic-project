/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-15 17:14:22
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-16 18:23:54
 * @FilePath: /basic-project/src/router/config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';
const routes = [];
//配置添加路由规则
const INGORE_ROUTER_NAME = [
    // 首页
    'index',
    // 登录
    'login'
];

const componentArr = [];
// pages 下面所有的组件
let requireContext = require.context('../pages', true, /\.vue$/, 'sync');
requireContext.keys().forEach(key => {
    // 通过 requireContext(key)导出文件内容
    const mod = requireContext(key);
    componentArr.push({
        file: `pages/${key.substring(2)}`,
        component: mod.__esModule && mod.default ? mod.default : mod
    });
});
// 递归获取 views 目录下的所有 Vue 文件
function getRouters(r) {
    r.keys().forEach(key => {
        if (r(key).default) {
            const componentConfig = r(key)
            const componentName = componentConfig.default.name || (
                componentConfig.default.options && componentConfig.default.options.name
            ) || key.replace(/^\.\/(.*)\.\w+$/, '$1')
            if (!INGORE_ROUTER_NAME.includes(componentName)) {
                routes.push({
                    path: `/${componentName.toLowerCase()}`,
                    name: componentName,
                    component: componentConfig.default
                })
            }
        }
    })
}

function filterRouters(router) {
    if (!include.length && exclude.length) {
        return exclude.indexOf(router) === -1
    }
    if (include.length && !exclude.length) return include.indexOf(router) > -1
    if (include.length && exclude.length) {
        return exclude.indexOf(router) === -1 && include.indexOf(router) > -1
    }
}
getRouters(require.context('../pages', true, /\.vue$/, 'sync'))
export default routes


// export default componentArr;
