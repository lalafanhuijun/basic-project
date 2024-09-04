/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-17 15:17:46
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-17 16:30:02
 * @FilePath: /basic-project/src/components/BasicChart/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BasicChart from './index.vue'

export default BasicChart.install = function (Vue) {
    Vue.component(BasicChart.name, BasicChart)
}