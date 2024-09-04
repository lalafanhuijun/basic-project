/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-17 16:12:27
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-17 16:27:28
 * @FilePath: /basic-project/src/utils/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//防抖（单位时间内重复触发重新计时）
export function debounce(fn, time) {
    //定时器
    time = time || 1000
    let timer = null
    return function (...args) {
        let _this = this
        if (timer) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                timer = null
                fn.apply(_this, args)
            }, time)
        }
    }
}
//节流（单位时间内触发只生效一次，其余触发无效）
export function throttle(fn, time) {
    time = time || 2000
    //定时器
    let timer = null
    return function (...args) {
        const _this = this;
        if (timer) {
            return
        }
        timer = setTimeout(function () {
            timer = null
        }, time)
        fn.apply(_this, args)
    }

}