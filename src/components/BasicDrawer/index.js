/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2023-09-13 10:12:27
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-15 19:09:39
 * @FilePath: /basic-project/src/components/BasicDrawer/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import BasicDrawer from './index.vue'

export default BasicDrawer.install = function (Vue) {
    Vue.component(BasicDrawer.name, BasicDrawer)
}