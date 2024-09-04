<!--
 * 折柱状混合图
-->
<template>
	<div>
		<basic-chart
			:chart-option="echartsOption"
			ref="basicEcharts"
			style="height: 40vh"
		>
		</basic-chart>
	</div>
</template>

<script>
export default {
	name: "BasicBarLine",
	props: {
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
			default: () => ["#36CBCB", "#4ECB73", "#FEAF26", "#FBD437", "#F2637B"],
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
		yNums: {
			type: Number,
			default: 1,
		},
		yAxisName: {
			type: String,
			default: "",
		},
	},
	data() {
		const _this = this;
		return {
			echartsOption: {
				title: {
					text: _this.title,
				},
				grid: {
					left: "5%",
					right: "4%",
					bottom: "10%",
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// Use axis to trigger tooltip
						type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
					},
				},
				legend: {
					// data: _this.legendData
				},
				color: _this.color,
				xAxis: {
					type: "category",
					data: _this.xAxisData,
				},
				yAxis: [
					{
						type: "value",
						splitLine: {
							lineStyle: {
								type: "dashed",
								color: "#E5E5E5",
							},
						},
						name: _this.yAxisName,
						// max: 0,
						// min: 100,
						// splitNumber: 5
						// interval: (orderSumsMax - orderSumsMin) / 5
					},
					{
						type: "value",
						splitLine: {
							lineStyle: {
								type: "dashed",
								color: "#E5E5E5",
							},
						},
						// max: 0,
						// min: 100,
						// splitNumber: 5
						// interval: (orderSumsMax - orderSumsMin) / 5
					},
				],
				series: [],
			},
		};
	},
	//监听数据变化重新赋值
	watch: {
		xAxisData(nVal, oVal) {
			console.log(oVal, nVal);
			this.echartsOption.xAxis.data = nVal;
			this.initOptions();
		},
		seriesData(nVal, oVal) {
			console.log(oVal, nVal);
			this.initOptions();
		},
	},
	mounted() {
		this.initOptions();
	},
	methods: {
		initOptions() {
			const _this = this;
			let lineData = [];
			let barData = [];
			if (this.seriesData.length > 0) {
				let seriesDataCopy = this.seriesData.map((item) => {
					if (item.type === "bar") {
						const itemStyle = {
							normal: {
								//这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
								barBorderRadius: [10, 10, 0, 0],
							},
						};
						item.barWidth = _this.barWidth;
						item.itemStyle = itemStyle;
						barData = barData.concat(item.data);
					} else {
						lineData = lineData.concat(item.data);
					}
					return item;
				});
				if (this.yNums === 2) {
					const yMax = _this.echartsYMax(Math.max(...barData));
					const yMin = _this.echartsYMin(Math.min(...barData));
					_this.echartsOption.yAxis[0].max = yMax;
					_this.echartsOption.yAxis[0].min = yMin;
					_this.echartsOption.yAxis[0].interval = (yMax - yMin) / 5;
					const yMaxLine = _this.echartsYMax(Math.max(...lineData));
					const yMinLine = _this.echartsYMin(Math.min(...lineData));
					_this.echartsOption.yAxis[1].max = yMaxLine;
					_this.echartsOption.yAxis[1].min = yMinLine;
					_this.echartsOption.yAxis[1].interval = (yMaxLine - yMinLine) / 5;
				}

				_this.echartsOption.series = seriesDataCopy;
			}
		},
		/**
		 * 统计图表计算Y轴最大值
		 * @param arr
		 * @returns {number}
		 */
		echartsYMax(max) {
			// if (!arr || arr.length <= 0) return 0;
			// let max = Math.max(...arr);
			let maxInt = Math.ceil(max / 9.5); // 不让最高的值超过最上面的刻度
			let maxVal = maxInt * 10; // 让显示的刻度是整数
			// 为了防止数据为0时，Y轴不显示，给个最大值
			if (maxVal === 0) {
				maxInt = 1;
			}
			return maxVal;
		},

		/**
		 * 统计图表计算Y轴最小值
		 * @param arr
		 * @returns {number}
		 */
		echartsYMin(min) {
			// if (!arr || arr.length <= 0) return 0;
			// let min = Math.min(...arr);
			let minInt = Math.floor(min / 10);
			//让显示的刻度是整数
			return minInt * 10;
		},
	},
};
</script>

<style></style>
