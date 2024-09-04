/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2023-09-13 10:12:26
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-15 19:11:23
 * @FilePath: /basic-project/src/components/BasicTabs/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BasicTabs from "./index.vue";

export default BasicTabs.install = function (Vue) {
    Vue.component(BasicTabs.name, BasicTabs);
};
