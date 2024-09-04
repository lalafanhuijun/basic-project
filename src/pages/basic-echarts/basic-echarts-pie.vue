<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 18:12:33
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-17 17:33:06
 * @FilePath: /basic-project/src/pages/basic-echarts/basic-echarts-pie.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<div class="flex-row">
			<basic-pie
				class="data-card-back"
				title="环形图示例"
				center
				subText="65%"
				:radius="['50%', '70%']"
				:seriesData="pieSeriesData"
				width="350px"
			></basic-pie>
			<basic-pie
				class="data-card-back"
				title="饼图示例"
				:radius="['0%', '70%']"
				:seriesData="pieSeriesData"
				width="350px"
			></basic-pie>
			<basic-pie
				class="data-card-back"
				title="半环形示例"
				:radius="['50%', '70%']"
				:seriesData="pieSeriesData"
				semiCircle
				width="350px"
			></basic-pie>
		</div>
		<div class="pad24">
			<el-button @click="refreshData" type="primary">更新数据</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pieSeriesData: [
				{ name: "测试1", value: 11 },
				{ name: "测试2", value: 78 },
			],
			isRadius: true,
			radius: ["50%", "70%"],
		};
	},
	methods: {
		refreshData() {
			this.pieSeriesData = [
				{ name: "测试1", value: 11 },
				{ name: "测试2", value: 78 },
				{ name: "测试3", value: 78 },
				{ name: "测试4", value: 78 },
			];
		},
		changeRadius() {
			this.isRadius = !this.isRadius;
			if (this.isRadius) {
				this.radius = ["50%", "70%"];
			} else {
				this.radius = ["0%", "70%"];
			}
		},
	},
};
</script>

<style></style>
