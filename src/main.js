/*
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-15 14:48:25
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 20:14:35
 * @FilePath: /basic-project/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/element.js';
// 导入应用样式
import '@/assets/styles/index.scss';
//导入mock数据
// import '@/mock';

//导入公共组件
import "@/components"; //公共组件

//路由
import router from './router';

// 引入echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;


// Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
