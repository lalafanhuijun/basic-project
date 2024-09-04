<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 18:13:19
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 19:40:30
 * @FilePath: /basic-project/src/pages/basic-echarts/basic-echarts-bar-line.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<basic-bar-line
			:seriesData="dataTypeSeriesData"
			:xAxisData="dataTypeXAxisData"
		></basic-bar-line>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//资料类别资料情况y轴数据
			dataTypeSeriesData: [
				{
					name: "工单数",
					type: "bar",
					data: [222, 222, 49, 45, 85, 244],
				},
				{
					name: "图片数",
					type: "line",
					yAxisIndex: 1,
					data: [123, 22, 46, 57, 333, 67],
				},
				{
					name: "文件数",
					type: "line",
					yAxisIndex: 1,
					data: [333, 57, 943, 267, 44, 87],
				},
				{
					name: "录音数",
					type: "line",
					yAxisIndex: 1,
					data: [78, 578, 89, 97, 199, 300],
				},
				{
					name: "视频数",
					type: "line",
					yAxisIndex: 1,
					data: [399, 89, 56, 98, 456, 89],
				},
			],
			dataTypeXAxisData: ["2001", "2002", "2003", "2004", "2005", "2006"],
			//资料类别资料情况x轴数据
		};
	},
};
</script>

<style></style>
