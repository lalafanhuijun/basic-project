/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 11:55:40
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-16 12:19:54
 * @FilePath: /basic-project/src/utils/axios.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// api/index.js
import axios from 'axios';

const baseApi = process.env.VUE_APP_MOCK_API;

export const request = axios.create({
    baseURL: baseApi,
    timeout: 5000, // 设置超时时间
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer your_token' // 示例：添加自定义Header
    }
});

request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如token验证等
        return config;
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        // 对响应数据做点什么，例如状态码判断等
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.statusText);
        }
    },
    error => {
        // 对响应错误做点什么，例如提示用户网络错误等
        if (error.response.status === 401) {
            // 处理未登录情况
            // ...
        } else if (error.response.status >= 500) {
            // 处理服务器内部错误等
            // ...
        }

        return Promise.reject(error.response);
    }
);