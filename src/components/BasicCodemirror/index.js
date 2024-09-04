
/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-17 15:17:46
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 20:17:45
 * @FilePath: /basic-project/src/components/BasicCodemirror/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BasicCodemirror from './index.vue'

export default BasicCodemirror.install = function (Vue) {
    Vue.component(BasicCodemirror.name, BasicCodemirror)
}