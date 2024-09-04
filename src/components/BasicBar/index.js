/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2023-09-13 10:12:26
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-15 19:22:27
 * @FilePath: /basic-project/src/components/BasicBar/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BasicBar from './index.vue'

export default BasicBar.install = function (Vue) {
  Vue.component(BasicBar.name, BasicBar)
}