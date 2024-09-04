<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 18:12:45
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 19:29:25
 * @FilePath: /basic-project/src/pages/basic-echarts/basic-echarts-bar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<!-- 柱状图组件 -->
		<basic-bar
			ref="labelCharts"
			title="堆叠柱状图"
			:seriesData="seriesData"
			:stack="[0, 1]"
			rotate="25"
			:grid="{ bottom: '35%', right: '2%', left: '6%' }"
			:xAxisData="xAxisData"
			:legendData="legendData"
		>
		</basic-bar>
		<basic-bar
			ref="labelCharts"
			title="柱状图"
			:seriesData="seriesData"
			rotate="25"
			:grid="{ bottom: '35%', right: '2%', left: '6%' }"
			:xAxisData="xAxisData"
			:legendData="legendData"
		>
		</basic-bar>
		<div class="pad24">
			<el-button @click="refreshData" type="primary">更新数据</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			seriesData: [
				[120, 200, 150, 80, 70, 110, 130],
				[240, 180, 130, 90, 20, 150, 70],
			], //echarts图数据
			xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //x轴数据
			legendData: ["标签标记台区数", "标签标记用户数"],
		};
	},
	methods: {
		refreshData() {
			this.seriesData = [
				[300, 100, 230, 80, 170, 10, 30],
				[120, 80, 100, 300, 120, 50, 170],
			]; //echarts图数据
			this.xAxisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; //x轴数据
			this.legendData = ["测试台区数", "测试用户数"];
		},
	},
};
</script>

<style></style>
