/*
 * @Author: fanhj fanhj
 * @Date: 2023-05-16 17:10:34
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-15 19:10:53
 * @FilePath: /ami-mf3520-anti-electricity-steal/src/components/BasicPie/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BasicPie from "./index.vue";

export default BasicPie.install = function (Vue) {
    Vue.component(BasicPie.name, BasicPie);
};
