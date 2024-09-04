/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2023-09-13 10:12:26
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 19:51:36
 * @FilePath: /basic-project/src/components/BasicDescriptions/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import BasicDescriptions from './index.vue'

export default BasicDescriptions.install = function (Vue) {
    Vue.component(BasicDescriptions.name, BasicDescriptions);
}
