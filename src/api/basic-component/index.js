/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 11:50:40
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-17 14:17:30
 * @FilePath: /basic-project/src/api/index/menus.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// api/user.js
import { request } from '@/utils/axios.js';

// export const getMenus = (userId) => {
//     return request.get(`/user/${userId}`);
// };
export function getTableList(data) {
    return request({
        url: "/table",
        params: data,
        method: "post",
    });
}