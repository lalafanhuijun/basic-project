/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-15 17:14:49
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-28 11:38:18
 * @FilePath: /basic-project/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 该文件专门用于创建整个应用的路由器
import Vue from 'vue';
import VueRouter from 'vue-router'
import routers from './config';
Vue.use(VueRouter);

//配置添加路由规则
const filterOptions = {
    include: [],
    exclude: ['test']
}
//创建并暴露一个路由器，`注意时routes不是routers`
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/pages/index'),
            children: [...routers]
            // children: [{
            //     name: "basic-component/basic-input-form",
            //     path: "/basic-component/basic-input-form",
            //     component: () => import('@/pages/basic-component/basic-input-form.vue'),
            // }]
        },
        {
            path: '/',
            name: 'test',
            component: () => import('@/pages/test'),
        },
    ]
})
console.log(router)

export default router;
