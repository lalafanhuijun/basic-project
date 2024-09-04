<!--
 * 基础柱状图
-->
<template>
	<div>
		<basic-chart
			:chart-option="echartsOption"
			:has-data="hasData"
			:auto-resize="true"
			class="chart1-bar"
			:height="height"
			:width="width"
		>
		</basic-chart>
	</div>
</template>

<script>
export default {
	name: "BasicBar",
	props: {
		width: {
			type: String,
			default: "100%",
		},
		height: {
			type: String,
			default: "300px",
		},
		hasData: {
			type: Boolean,
			default: true,
		},
		//图表数据
		seriesData: {
			type: Array,
			default: () => [],
		},
		//x轴数据值
		xAxisData: {
			type: Array,
			default: () => [],
		},
		//多条数据名称
		legendData: {
			type: Array,
			default: () => [],
		},
		//颜色
		color: {
			type: Array,
			default: () => ["#1891FC", "#33D0AC"],
		},
		//确定那几个柱状图堆叠
		stack: {
			type: Array,
			default: () => [],
		},
		//标题
		title: {
			type: String,
			default: "",
		},
		//条宽
		barWidth: {
			type: Number,
			default: 15,
		},
		//横坐标文字旋转
		rotate: {
			type: String,
			default: "",
		},
		grid: {
			type: Object,
			default: () => {
				return { left: 30, right: 20, bottom: 20 };
			},
		},
	},
	data() {
		const _this = this;
		return {
			//echarts图options信息
			echartsOption: {
				title: {
					text: _this.title,
				},
				grid: _this.grid,
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// Use axis to trigger tooltip
						type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
					},
				},
				legend: {
					data: _this.legendData,
				},
				xAxis: {
					type: "category",
					data: _this.xAxisData,
					axisLabel: {
						rotate: _this.rotate,
					},
				},
				yAxis: {
					type: "value",
				},
				series: [],
			},
		};
	},
	//监听数据变化重新赋值
	watch: {
		xAxisData(nVal, oVal) {
			this.echartsOption.xAxis.data = nVal;
		},
		seriesData(nVal, oVal) {
			this.initOptions();
		},
	},
	mounted() {
		this.initOptions(); //初始化echarts数据
	},
	methods: {
		initOptions() {
			const _this = this;
			if (this.seriesData.length > 0) {
				//组织柱状图series数据
				this.echartsOption.series = this.seriesData.map((item, index) => {
					const stackName = this.stack.includes(index) ? "stackBar" : ""; //支持柱状图堆叠
					return {
						data: item,
						type: "bar",
						stack: stackName,
						emphasis: {
							focus: "series",
						},
						barWidth: this.barWidth, //柱状宽度
						name: this.legendData[index] || "",
						itemStyle: {
							normal: {
								color: _this.color[index % _this.color.length],
							},
						},
					};
				});
			}
		},
	},
};
</script>

<style></style>
