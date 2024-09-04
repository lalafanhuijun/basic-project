/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 11:44:31
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-16 12:37:24
 * @FilePath: /basic-project/src/mock/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引用 Mock
const Mock = require('mockjs')
const baseUrl = process.env.VUE_APP_MOCK_API;

// export const menus = Mock.mock("/data/menus", "get", require('./data/menus.json'));
Mock.mock(baseUrl + "/menus", "get", require('./data/menus.json'));
export default Mock