/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-15 14:48:25
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-15 19:57:09
 * @FilePath: /basic-project/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}
